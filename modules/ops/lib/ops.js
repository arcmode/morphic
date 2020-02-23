'use strict';
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
const path_1 = require("path");
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const yaml_1 = __importDefault(require("yaml"));
const THIS_DIR = path_1.resolve(__dirname);
async function ops(opts) {
    const { path = '.', name = await resolveName(path_1.resolve(path)), context = '.', _ = [] } = opts;
    const pkg = await resolvePackage(path_1.resolve(path));
    const resolvedPath = path_1.resolve(path);
    const resolvedContext = path_1.resolve(context);
    const cmd = path_1.resolve(`${THIS_DIR}/../bin/ops.bash`);
    const [op = 'test'] = _;
    switch (op) {
        case 'deploy':
        case 'build_docker':
        case 'kind_load':
        case 'kube_clear':
        case 'kube_apply':
            const args = [
                op,
                name,
                resolvedPath.replace(resolvedContext, ''),
                resolvedContext, pkg
            ];
            const config = await resolveConfig(resolvedPath);
            return new Promise((resolve, reject) => {
                const op = child_process_1.spawn(cmd, args);
                op.stdin.write(genServiceDeployment({
                    config,
                    name,
                }));
                op.stdout.on('data', function (data) {
                    process.stdout.write(data);
                });
                op.stderr.on('error', function (err) {
                    process.stderr.write(err.name);
                    process.stderr.write(err.message);
                    process.stderr.write(err.stack || '<NO_STACK>');
                });
                op.on('close', function (code) {
                    if (code !== 0) {
                        console.log(`grep process exited with code ${code}`);
                        reject(code);
                    }
                    else {
                        resolve(code);
                    }
                });
                op.stdin.end();
            });
        default:
            throw new Error(`NotImplemented: ${op}`);
    }
}
exports.ops = ops;
const resolveName = async (path) => {
    return (await resolvePackage(path)).replace(/^@[^\/]+\//, '');
};
const resolvePackage = async (path) => {
    const packageSrc = await fs_1.promises.readFile(`${path}/package.json`);
    const packageData = JSON.parse(packageSrc.toString());
    return packageData['name'];
};
const resolveConfig = async (path) => {
    const packageSrc = await fs_1.promises.readFile(`${path}/package.json`);
    const packageData = JSON.parse(packageSrc.toString());
    const configs = [];
    for (const key of Object.keys(packageData)) {
        if (/(rest|rpc)-include$/.test(key)) {
            const modules = packageData[key];
            for (const mod of modules) {
                const modSrc = await Promise.resolve().then(() => __importStar(require(mod)));
                if (modSrc.defaultConfig) {
                    configs.push(modSrc.defaultConfig);
                }
            }
        }
    }
    return Object.assign({}, ...configs);
};
const genServiceDeployment = ({ config, name }) => {
    console.log(config);
    return [
        // config,
        {
            "apiVersion": "apps/v1",
            "kind": "Deployment",
            "metadata": {
                "labels": {
                    "service": name
                },
                "name": name
            },
            "spec": {
                "replicas": 1,
                "selector": {
                    "matchLabels": {
                        "service": name
                    }
                },
                "strategy": {},
                "template": {
                    "metadata": {
                        "labels": {
                            "service": name
                        }
                    },
                    "spec": {
                        "containers": [
                            {
                                "env": [
                                    {
                                        "name": "PORT",
                                        "value": "3113"
                                    }
                                ],
                                "image": `${name}:latest`,
                                "name": name,
                                "ports": [
                                    {
                                        "containerPort": 3113
                                    }
                                ],
                                "resources": {},
                                "imagePullPolicy": "IfNotPresent"
                            }
                        ],
                        "restartPolicy": "Always"
                    }
                }
            },
            "status": {}
        },
        {
            "apiVersion": "v1",
            "kind": "Service",
            "metadata": {
                "labels": {
                    "service": name
                },
                "name": name
            },
            "spec": {
                "ports": [
                    {
                        "name": "3113",
                        "port": 3113,
                        "targetPort": 3113
                    }
                ],
                "selector": {
                    "service": name
                }
            },
            "status": {
                "loadBalancer": {}
            }
        }
    ].map(item => yaml_1.default.stringify(item)).join('---\n');
};
//# sourceMappingURL=ops.js.map