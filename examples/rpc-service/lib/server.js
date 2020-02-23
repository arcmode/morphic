"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rpc_1 = require("@frameless/rpc");
exports.defaultConfig = {
    PORT: '0'
};
exports.createInstance = (modules, conf) => {
    const app = express_1.default();
    for (const mod of modules) {
        app.use(rpc_1.createRoutes(mod));
    }
    let listener;
    const start = () => {
        return new Promise((resolve, reject) => {
            listener = app.listen(parseInt(conf.PORT, 10), () => {
                if (listener) {
                    console.log('Server listening', listener.address());
                    resolve(listener.address());
                }
                else {
                    reject('Listener is null');
                }
            });
        });
    };
    const stop = async () => {
        return new Promise((resolve, reject) => {
            if (listener) {
                listener.close((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    };
    return {
        start,
        stop
    };
};
//# sourceMappingURL=server.js.map