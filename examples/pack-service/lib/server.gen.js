"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const pack_1 = require("@frameless/pack");
const instance = fastify_1.default({
    logger: true
});
//
// TODO: Add base plugins for initialization
//
instance.register(pack_1.createFastifyPlugin(require.resolve('@frameless-examples/pack-rpc-client/package.json')));
const PORT = process.env.PORT
    ? Number(process.env.PORT)
    : 0;
instance.listen(PORT, (err, address) => {
    if (err) {
        throw err;
    }
    instance.log.info(`server listening on ${address}`);
});
//# sourceMappingURL=server.gen.js.map