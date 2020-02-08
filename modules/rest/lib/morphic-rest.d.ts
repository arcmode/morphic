/// <reference types="node" />
import fastify from 'fastify';
import { AnyData } from '@frameless/model';
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
declare type DefaultQuery = {
    [k: string]: string;
};
declare type DefaultParams = {
    [k: string]: string;
};
declare type DefaultHeaders = {
    [k: string]: string;
};
declare type DefaultBody = AnyData;
declare type RestMod<Query extends DefaultQuery, Params extends DefaultParams, Headers extends DefaultHeaders, Body extends DefaultBody, Config extends string, Result extends RestResponse> = {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    schema: RouteSchema<object>;
    config?: Record<Config, string | undefined>;
    handler: (req: RestRequest<Query, Params, Headers, Body>, cfg: Record<Config, string>) => Promise<Result>;
};
export declare const createFastifyPlugin: <Q extends DefaultQuery, P extends DefaultParams, H extends DefaultHeaders, B extends AnyData, C extends string, R extends RestResponse>(mod: RestMod<Q, P, H, B, C, R>, cfg: IConfig) => (instance: fastify.FastifyInstance<import("http").Server, import("http").IncomingMessage, ServerResponse>, options: fp.PluginOptions, callback: (err?: fastify.FastifyError | undefined) => void) => void;
export {};
//# sourceMappingURL=morphic-rest.d.ts.map
