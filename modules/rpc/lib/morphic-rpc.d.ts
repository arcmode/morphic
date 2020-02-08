/// <reference types="express" />
import { ArrayItem, ThenArg, JsonFn } from '@frameless/utils';
export declare type RpcMod<M> = Record<keyof M, JsonFn<M, keyof M>>;
declare type RpcDefinition<M extends RpcMod<M>> = {
    [k in keyof M]: {
        request: ArrayItem<Parameters<M[k]>>;
        response: ThenArg<ReturnType<M[k]>>;
    };
};
export declare const getDefinition: <M extends Record<keyof M, JsonFn<M, keyof M>>>(mod: M) => RpcDefinition<M>;
export declare const createClient: <M extends Record<keyof M, JsonFn<M, keyof M>>>(mod: M, remoteAddress: string) => import("rpc_ts/lib/client/service").ServiceMethodMap<RpcDefinition<M>, any>;
export declare const createRoutes: <M extends Record<keyof M, JsonFn<M, keyof M>>>(mod: M) => import("express").Router;
export {};
//# sourceMappingURL=morphic-rpc.d.ts.map