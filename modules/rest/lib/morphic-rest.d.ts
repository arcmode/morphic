/// <reference types="node" />
import fastify from 'fastify';
import { AnyData } from '@morphic/types';
import fp, { PluginOptions } from 'fastify-plugin';
import { ServerResponse } from 'http';
import { IConfig } from 'config';
declare type RouteSchema<S> = {
    body?: S;
    querystring?: S;
    params?: S;
    headers?: S;
    response?: {
        [code: number]: S;
        [code: string]: S;
    };
};
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
declare type RestMod<Query, Params, Headers, Body, Config, Result> = {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    schema: RouteSchema<object>;
    config?: Record<keyof Config, string | undefined>;
    handler: (req: RestRequest<Query, Params, Headers, Body>, cfg: Config) => Promise<Result>;
};
export declare const createFastifyPlugin: <Q extends fastify.DefaultQuery, P extends fastify.DefaultParams, H extends fastify.DefaultHeaders, B extends any, C extends Record<string, string>, R extends RestResponse>(mod: RestMod<Q, P, H, B, C, R>, cfg: IConfig) => (instance: fastify.FastifyInstance<import("http").Server, import("http").IncomingMessage, ServerResponse>, options: fp.PluginOptions, callback: (err?: fastify.FastifyError | undefined) => void) => void;
export {};
//# sourceMappingURL=morphic-rest.d.ts.map