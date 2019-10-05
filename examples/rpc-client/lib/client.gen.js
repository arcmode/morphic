"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rpc_1 = require("@morphic/rpc");
const source = __importStar(require("@morphic-examples/hello-rpc"));
const rpc = rpc_1.createClient(source, 'http://rpc-morphic-example-hello-rpc');
exports.helloRpc = rpc.helloRpc;
//# sourceMappingURL=client.gen.js.map