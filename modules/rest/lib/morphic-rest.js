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
exports.createFastifyPlugin = (mod, cfg) => fastify_plugin_1.default((server, options, done) => {
    const config = {};
    const defaultCfg = mod.config || {};
    for (const key in defaultCfg) {
        const val = cfg.has(key) ?
            cfg.get(key) :
            key in process.env ?
                process.env[key] :
                defaultCfg[key];
        if (typeof val !== 'string') {
            throw new TypeError(`Configuration Error: "${key}" not found`);
        }
        config[key] = val;
    }
    server.route({
        url: mod.url,
        method: mod.method,
        schema: mod.schema,
        config,
        handler: async (req, reply) => {
            const restReq = {
                query: req.query,
                params: req.params,
                headers: req.headers,
                body: req.body,
                options
            };
            await promiseHandler(mod.handler(restReq, reply.context.config), reply, server);
        }
    });
    done();
});
//# sourceMappingURL=morphic-rest.js.map