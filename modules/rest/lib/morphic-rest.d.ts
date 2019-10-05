/// <reference types="node" />
import fastify, { RouteOptions } from 'fastify';
import { AnyData } from '@morphic/types';
import fp, { PluginOptions } from 'fastify-plugin';
import { ServerResponse } from 'http';
declare type RestResponse<R> = {
    status: number;
    headers?: Record<string, string>;
    body?: R;
};
declare type RestRequest<Q, P, H, B> = {
    query: Q;
    params: P;
    headers: H;
    body: B;
    options: PluginOptions;
};
declare type RestMod<Q, P, H, B, R> = Omit<RouteOptions, 'handler'> & ({
    handler: (input: RestRequest<Q, P, H, B>) => Promise<RestResponse<R>>;
});
export declare const createFastifyPlugin: <Q extends fastify.DefaultQuery, P extends fastify.DefaultParams, H extends fastify.DefaultHeaders, B extends any, R extends AnyData>(mod: RestMod<Q, P, H, B, R>) => (instance: fastify.FastifyInstance<import("http").Server, import("http").IncomingMessage, ServerResponse>, options: fp.PluginOptions, callback: (err?: fastify.FastifyError | undefined) => void) => void;
export {};
//# sourceMappingURL=morphic-rest.d.ts.map