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
        server.log.error(err.message ? err.message : 'Internal Server Error', err);
        reply.send(500);
    }
};
exports.createFastifyPlugin = (mod, cfg) => fastify_plugin_1.default((server, _options, done) => {
    const config = {};
    const defaultCfg = mod.defaultConfig || {};
    for (const key in defaultCfg) {
        const val = key in cfg
            ? cfg[key]
            : defaultCfg[key];
        if (typeof val !== 'string') {
            throw new TypeError(`Configuration Error: "${key}" not found`);
        }
        config[key] = val;
    }
    // resolve manager managers
    const defaultManagers = mod.defaultManagers || {};
    const managers = {};
    for (const key in defaultManagers) {
        // TODO: standarize wrappers
        //       facilitate middleware and other patterns
        const manager = defaultManagers[key];
        managers[key] = async (input) => {
            server.log.info(`${key} -- INIT:`, input);
            const result = await manager(input);
            server.log.info(`${key} -- RESULT:`, result);
            return result;
        };
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
            };
            await promiseHandler(mod.handler(restReq, reply.context.config, managers), reply, server);
        }
    });
    done();
});
//# sourceMappingURL=morphic-rest.js.map