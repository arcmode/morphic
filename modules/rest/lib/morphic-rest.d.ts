/// <reference types="node" />
import fastify, { RouteOptions } from 'fastify';
import { AnyData } from '@morphic/types';
import fp, { PluginOptions } from 'fastify-plugin';
import { ServerResponse } from 'http';
import { IConfig } from 'config';
declare type RestResponse = {
    status: number;
    headers?: Record<string, string>;
    body?: AnyData;
};
declare type RestRequest<Q, P, H, B> = {
    query: Q;
    params: P;
    headers: H;
    body: B;
    options: PluginOptions;
};
declare type RestMod<Q, P, H, B, R, C> = Omit<Omit<RouteOptions, 'config'>, 'handler'> & ({
    config?: Record<string, string | undefined>;
    handler: (req: RestRequest<Q, P, H, B>, cfg: C) => Promise<RestResponse>;
});
export declare const createFastifyPlugin: <Q extends fastify.DefaultQuery, P extends fastify.DefaultParams, H extends fastify.DefaultHeaders, B extends any, R extends AnyData, C extends Record<string, string>>(mod: RestMod<Q, P, H, B, R, C>, cfg: IConfig) => (instance: fastify.FastifyInstance<import("http").Server, import("http").IncomingMessage, ServerResponse>, options: fp.PluginOptions, callback: (err?: fastify.FastifyError | undefined) => void) => void;
export {};
//# sourceMappingURL=morphic-rest.d.ts.map