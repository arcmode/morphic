import fastify, {
    FastifyInstance,
    RouteOptions,
    DefaultQuery,
    DefaultParams,
    DefaultHeaders,
    DefaultBody
} from 'fastify';
import { AnyData } from '@morphic/types';
import fp, { PluginOptions, nextCallback } from 'fastify-plugin';
import { ServerResponse } from 'http';

// TODO: HATEOAS
type RestResponse<R> = {
    status: number,
    headers?: Record<string, string>,
    body?: R
};

type RestRequest<Q, P, H, B> = {
    query: Q,
    params: P,
    headers: H,
    body: B,
    options: PluginOptions
};

type RestMod<
    Q,
    P,
    H,
    B,
    R,
    > = Omit<RouteOptions, 'handler'> & ({
        handler: (input: RestRequest<Q, P, H, B>) => Promise<RestResponse<R>>
    });

const promiseHandler = async <R, T extends RestResponse<R>>(
    promise: Promise<T>,
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
        server.log.error(err.message ? err.message : 'Unexpected Error', err);
        reply.send(500);
    }
}

// TODO: generator as state machine

export const createFastifyPlugin = <
    Q extends DefaultQuery,
    P extends DefaultParams,
    H extends DefaultHeaders,
    B extends DefaultBody,
    R extends AnyData
>(mod: RestMod<Q, P, H, B, R>) => fp((
    server: FastifyInstance,
    options: PluginOptions,
    done: nextCallback
) => {
    server.route({
        ...mod,
        handler: async (req, reply) => {
            const restReq = {
                query: req.query,
                params: req.params,
                headers: req.headers,
                body: req.body,
                options
            } as RestRequest<Q, P, H, B>;

            await promiseHandler(
                mod.handler(restReq),
                reply,
                server
            );
        }
    });
    done();
});
