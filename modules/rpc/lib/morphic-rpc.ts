import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { ModuleRpcProtocolServer } from 'rpc_ts/lib/protocol/server';
import { ModuleRpcProtocolClient } from 'rpc_ts/lib/protocol/client';
import { ArrayItem, ThenArg, JsonFn } from '@frameless/utils';

export type RpcMod<M> = Record<keyof M, JsonFn<M, keyof M>>;

type RpcDefinition<M extends RpcMod<M>> = {
    [k in keyof M]: {
        request: ArrayItem<Parameters<M[k]>>,
        response: ThenArg<ReturnType<M[k]>>
    }
};

export const getDefinition = <M extends RpcMod<M>>(mod: M): RpcDefinition<M> => {
    const definition = {} as RpcDefinition<M>;

    for (const key of Object.keys(mod) as Array<keyof M>) {
        definition[key] = {
            request: {} as ArrayItem<Parameters<M[typeof key]>>,
            response: {} as ThenArg<ReturnType<M[typeof key]>>
        };
    }

    return definition;
};

export const createClient = <M extends RpcMod<M>>(mod: M, remoteAddress: string) => {
    return ModuleRpcProtocolClient.getRpcClient(getDefinition<M>(mod), {
        remoteAddress,
        getGrpcWebTransport: NodeHttpTransport(),
    })
}

export const createRoutes = <M extends RpcMod<M>>(mod: M) => {
    const handler = {
        definition: getDefinition<M>(mod),
        implementation: mod
    };
    return ModuleRpcProtocolServer.registerRpcRoutes(handler.definition, handler.implementation);
}
