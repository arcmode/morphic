'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
async function start(opts) {
    const { path = '.', _ = [] } = opts;
    const pkg = await resolvePackage(path_1.resolve(path));
    const [headPkg, ...tailPkgs] = await Promise.all(pkg['frameless'].map(async (pkg) => {
        try {
            return await Promise.resolve().then(() => __importStar(require(pkg)));
        }
        catch {
            return await Promise.resolve().then(() => __importStar(require(path_1.resolve(path, pkg))));
        }
    }));
    return headPkg.createInstance(tailPkgs, headPkg.defaultConfig).start();
}
exports.start = start;
const resolvePackage = async (path) => {
    const packageSrc = await fs_1.promises.readFile(`${path}/package.json`);
    return JSON.parse(packageSrc.toString());
};
//# sourceMappingURL=start.js.map