"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const direct = __importStar(require("@morphic-examples/hello-rpc"));
// import * as client from '@morphic-examples/rpc-client';
exports.url = '/hello-rest/:name';
exports.method = 'GET';
exports.schema = {
    response: {
        200: {
            type: 'object',
            properties: {
                greetings: {
                    type: 'object',
                    properties: {
                        direct: {
                            type: 'string'
                        },
                        client: {
                            type: 'string'
                        }
                    }
                }
            }
        },
        500: {
            type: 'object',
            properties: {
                errors: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                }
            }
        }
    }
};
exports.config = {
    HOSTNAME: 'localhost',
    NODE_ENV: 'development',
};
exports.handler = async (req, cfg) => {
    console.log({ cfg });
    try {
        const directResult = await direct.helloRpc(req.params.name);
        // const clientResult = await client.helloRpc(
        // req.params.name
        // );
        return {
            status: 200,
            headers: {
                ['powered-by']: 'morphic'
            },
            body: {
                greetings: {
                    direct: directResult,
                }
            }
        };
    }
    catch (err) {
        return {
            status: 500,
            body: {
                errors: [err.message]
            }
        };
    }
};
//# sourceMappingURL=hello-rest.js.map