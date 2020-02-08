import fastify, {
    FastifyInstance,
} from 'fastify';
import { AnyData } from '@frameless/model';
import fp, { PluginOptions, nextCallback } from 'fastify-plugin';
import { ServerResponse } from 'http';
import { IConfig } from 'config';

type RouteSchema<S> = {
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

type RestRequest<Q, P, H, B> = {
    query: Q,
    params: P,
    headers: H,
    body: B,
    options: PluginOptions
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

type RestMod<
    Query extends DefaultQuery,
    Params extends DefaultParams,
    Headers extends DefaultHeaders,
    Body extends DefaultBody,
    Config extends string,
    Result extends RestResponse,
> = {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    schema: RouteSchema<object>,
    config?: Record<Config, string | undefined>,
    handler: (
        req: RestRequest<Query, Params, Headers, Body>,
        cfg: Record<Config, string>
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
>(mod: RestMod<Q, P, H, B, C, R>, cfg: IConfig) => fp((
    server: FastifyInstance,
    options: PluginOptions,
    done: nextCallback
) => {
    const config = {} as Record<C, string>
    const defaultCfg = mod.config || {} as typeof config
    // if a config key is defined via config package
    // then we read configurations via the config package
    // else by directly looking into environment variables
    for (const key in defaultCfg) {
        const val = cfg.has(key) ?
            cfg.get(key) :
            key in process.env ?
                process.env[key] :
                defaultCfg[key]
        if (typeof val !== 'string') {
            throw new TypeError(`Configuration Error: "${key}" not found`)
        }
        config[key] = val
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
                options
            } as RestRequest<Q, P, H, B>;

            await promiseHandler(
                mod.handler(restReq, reply.context.config) as Promise<RestResponse>,
                reply,
                server
            );
        }
    });
    done();
});
