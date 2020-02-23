/// <reference types="node" />
import fastify from 'fastify';
import { AnyData } from '@frameless/utils';
import fp from 'fastify-plugin';
import { ServerResponse } from 'http';
export declare type RouteSchema<S> = {
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
export declare type RestRequest<Q, P, H, B> = {
    query: Q;
    params: P;
    headers: H;
    body: B;
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
export declare type RestMod<Query extends DefaultQuery, Params extends DefaultParams, Headers extends DefaultHeaders, Body extends DefaultBody, Config extends string, Result extends RestResponse, K extends string> = {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    schema: RouteSchema<object>;
    defaultConfig?: Record<Config, string | undefined>;
    defaultManagers?: Record<K, (payload?: any) => Promise<any>>;
    handler: (req: RestRequest<Query, Params, Headers, Body>, cfg: Record<Config, string>, act: Record<K, (payload?: any) => Promise<any>>) => Promise<Result>;
};
export declare const createFastifyPlugin: <Q extends DefaultQuery, P extends DefaultParams, H extends DefaultHeaders, B extends AnyData, C extends string, R extends RestResponse, K extends string>(mod: RestMod<Q, P, H, B, C, R, K>, cfg: Record<C, string>) => (instance: fastify.FastifyInstance<import("http").Server, import("http").IncomingMessage, ServerResponse>, options: fp.PluginOptions, callback: (err?: fastify.FastifyError | undefined) => void) => void;
export {};
//# sourceMappingURL=morphic-rest.d.ts.map