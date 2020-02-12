"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@frameless/client");
/*
 * import rest modules
 */
const framelessExamplesHelloRest = __importStar(require("@frameless-examples/hello-rest"));
/*
 * TODO: Add base plugins for initialization
 */
/*
 * add rest modules to the service
 */
exports.createClient = (baseUrl) => {
    return {
        framelessExamplesHelloRest: client_1.createRouteClient(baseUrl, framelessExamplesHelloRest),
    };
};
//# sourceMappingURL=client.gen.js.map