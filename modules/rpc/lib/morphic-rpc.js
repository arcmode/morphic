"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_web_node_http_transport_1 = require("@improbable-eng/grpc-web-node-http-transport");
const server_1 = require("rpc_ts/lib/protocol/server");
const client_1 = require("rpc_ts/lib/protocol/client");
exports.getDefinition = (mod) => {
    const definition = {};
    for (const key of Object.keys(mod)) {
        definition[key] = {
            request: {},
            response: {}
        };
    }
    return definition;
};
exports.createClient = (mod, remoteAddress) => {
    return client_1.ModuleRpcProtocolClient.getRpcClient(exports.getDefinition(mod), {
        remoteAddress,
        getGrpcWebTransport: grpc_web_node_http_transport_1.NodeHttpTransport(),
    });
};
exports.createRoutes = (mod) => {
    const handler = {
        definition: exports.getDefinition(mod),
        implementation: mod
    };
    return server_1.ModuleRpcProtocolServer.registerRpcRoutes(handler.definition, handler.implementation);
};
//# sourceMappingURL=morphic-rpc.js.map