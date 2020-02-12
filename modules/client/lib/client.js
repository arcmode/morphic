"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.createRouteClient = (baseUrl, route) => (req) => axios_1.default({
    method: route.method,
    url: `${baseUrl}${route.url}`,
    headers: req.headers,
    data: req.body,
});
//# sourceMappingURL=client.js.map