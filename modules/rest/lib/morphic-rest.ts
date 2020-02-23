import fastify, {
    FastifyInstance,
} from 'fastify';
import { AnyData } from '@frameless/utils';
import fp, { PluginOptions, nextCallback } from 'fastify-plugin';
import { ServerResponse } from 'http';

export type RouteSchema<S> = {
    body?: S,
    querystring?: S,
    params?: S,
    headers?: S,
    response?: {
        [code: number]: S,
        [code: string]: S,
    },
}

type RestResponse = {
    status: number,
    headers?: Record<string, string>,
    // TODO: HATEOAS
    body?: AnyData
};

export type RestRequest<Q, P, H, B> = {
    query: Q,
    params: P,
    headers: H,
    body: B,
};

type DefaultQuery = {
    [k: string]: string
};

type DefaultParams = {
    [k: string]: string
};

type DefaultHeaders = {
    [k: string]: string
};

type DefaultBody = AnyData;

export type RestMod<
    Query extends DefaultQuery,
    Params extends DefaultParams,
    Headers extends DefaultHeaders,
    Body extends DefaultBody,
    Config extends string,
    Result extends RestResponse,
    K extends string,
> = {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    schema: RouteSchema<object>,
    defaultConfig?: Record<Config, string | undefined>,
    defaultManagers?: Record<K, (payload?: any) => Promise<any>>,
    handler: (
        req: RestRequest<Query, Params, Headers, Body>,
        cfg: Record<Config, string>,
        act: Record<K, (payload?: any) => Promise<any>>,
    ) => Promise<Result>
};

const promiseHandler = async <Result>(
    promise: Promise<RestResponse>,
    reply: fastify.FastifyReply<ServerResponse>,
    server: FastifyInstance
) => {
    try {
        const { status, headers, body } = await promise;
        reply
            .status(status)
            .headers(headers ? headers : {})
            .send(body);
    } catch (err) {
        server.log.error(err.message ? err.message : 'Internal Server Error', err);
        reply.send(500);
    }
}

export const createFastifyPlugin = <
    Q extends DefaultQuery,
    P extends DefaultParams,
    H extends DefaultHeaders,
    B extends DefaultBody,
    C extends string,
    R extends RestResponse,
    K extends string,
>(mod: RestMod<Q, P, H, B, C, R, K>, cfg: Record<C, string>) => fp((
    server: FastifyInstance,
    _options: PluginOptions,
    done: nextCallback
) => {
    const config = {} as typeof cfg
    const defaultCfg = mod.defaultConfig || {} as typeof config
    for (const key in defaultCfg) {
        const val = key in cfg
            ? cfg[key]
            : defaultCfg[key]
        if (typeof val !== 'string') {
            throw new TypeError(`Configuration Error: "${key}" not found`)
        }
        config[key] = val
    }
    // resolve manager managers
    const defaultManagers = mod.defaultManagers || {} as Record<K, (input: any) => Promise<any>>
    const managers = {} as typeof defaultManagers
    for (const key in defaultManagers) {
        // TODO: standarize wrappers
        //       facilitate middleware and other patterns
        const manager = defaultManagers[key as K]
        managers[key as K] = async (input) => {
            server.log.info(`${key} -- INIT:`, input)
            const result = await manager(input)
            server.log.info(`${key} -- RESULT:`, result)
            return result
        }
    }
    server.route({
        url: mod.url,
        method: mod.method,
        schema: mod.schema,
        config,
        handler: async (req, reply) => {
            const restReq = {
                query: req.query,
                params: req.params,
                headers: req.headers,
                body: req.body,
            } as RestRequest<Q, P, H, B>;

            await promiseHandler(
                mod.handler(restReq, reply.context.config, managers) as Promise<RestResponse>,
                reply,
                server
            );
        }
    });
    done();
});
