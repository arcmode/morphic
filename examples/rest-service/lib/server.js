"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const rest_1 = require("@frameless/rest");
exports.defaultConfig = {
    PORT: '0'
};
exports.createInstance = (modules, config) => {
    const instance = fastify_1.default({
        logger: true
    });
    for (const mod of modules) {
        instance.register(rest_1.createFastifyPlugin(mod, config));
    }
    const start = () => {
        return new Promise((resolve, reject) => {
            instance.listen(parseInt(config.PORT, 10), (err, address) => {
                if (err) {
                    reject(err);
                }
                else {
                    instance.log.info(`server listening on ${address}`);
                    resolve(address);
                }
            });
        });
    };
    const stop = async () => {
        await instance.close();
    };
    return {
        start,
        stop
    };
};
//# sourceMappingURL=server.js.map