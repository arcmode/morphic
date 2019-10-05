"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const rest_1 = require("@morphic/rest");
const morphicExamplesHelloRest = __importStar(require("@morphic-examples/hello-rest"));
const instance = fastify_1.default({
    logger: true
});
//
// TODO: Add base plugins for initialization
//
instance.register(rest_1.createFastifyPlugin(morphicExamplesHelloRest));
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