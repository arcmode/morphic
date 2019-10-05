"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const promiseHandler = async (promise, reply, server) => {
    try {
        const { status, headers, body } = await promise;
        reply
            .status(status)
            .headers(headers ? headers : {})
            .send(body);
    }
    catch (err) {
        server.log.error(err.message ? err.message : 'Unexpected Error', err);
        reply.send(500);
    }
};
// TODO: generator as state machine
exports.createFastifyPlugin = (mod) => fastify_plugin_1.default((server, options, done) => {
    server.route({
        ...mod,
        handler: async (req, reply) => {
            const restReq = {
                query: req.query,
                params: req.params,
                headers: req.headers,
                body: req.body,
                options
            };
            await promiseHandler(mod.handler(restReq), reply, server);
        }
    });
    done();
});
//# sourceMappingURL=morphic-rest.js.map