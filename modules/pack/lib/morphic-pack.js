"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
exports.createFastifyPlugin = (pathToPackageFile) => fastify_plugin_1.default(async (server, options, done) => {
    const pkg = await exports.readPackageFile(pathToPackageFile);
    const templatesAbsolutePath = path_1.join(path_1.dirname(pathToPackageFile), pkg.morphic.templates);
    server.log.debug('Packaging...', {
        pkg,
        templatesAbsolutePath
    });
    server.route({
        method: 'GET',
        url: pkg.morphic.url,
        handler: async (req, reply) => {
            const result = await exports.pack(templatesAbsolutePath, {
                query: req.query,
                params: req.params,
                options: options
            });
            reply.send(result);
        }
    });
    done();
});
exports.pack = async (templates, input) => {
    const folder = await exports.genTempDir('morphic-');
    const hygenDir = `${folder}/hygen`;
    await exports.generate(templates, folder, input.query, input.params, 'hygen');
    await exports.generate(templates, hygenDir, input.query, input.params, 'package');
    const pkgDir = `${hygenDir}/package`;
    const file = await exports.genNpmPackage(pkgDir);
    const filepath = `${pkgDir}/${file}`;
    return new Promise((resolve, reject) => {
        const stream = fs_1.createReadStream(filepath).on('finish', (..._args) => {
            fs_1.unlink(filepath, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(stream);
                }
            });
        });
    });
};
exports.genTempDir = (prefix) => new Promise((resolve, reject) => {
    fs_1.mkdtemp(path_1.join(os_1.tmpdir(), prefix), (err, folder) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(folder);
        }
    });
});
exports.generate = (templates, cwd, query, params, resource) => new Promise((resolve, reject) => {
    const environ = `HYGEN_TMPLS=${templates}`;
    const baseCmd = `npx hygen ${resource} new`;
    const fullCmd = `${environ} ${baseCmd} ${exports.genHygenParams(query, params)}`;
    child_process_1.exec(fullCmd, { cwd }, (err, stdout, _stderr) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(stdout);
        }
    });
});
exports.genNpmPackage = (folder) => new Promise((resolve, reject) => {
    child_process_1.exec('npm pack', { cwd: folder }, (err, stdout, _stderr) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(stdout.trim());
        }
    });
});
exports.genHygenParams = (query, params) => Object.entries({ ...params, ...query }).reduce((acc, [k, v]) => `${acc} --${k} ${v}`, '');
exports.readPackageFile = (pathToPackageFile) => new Promise((resolve, reject) => {
    fs_1.readFile(pathToPackageFile, (err, data) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(JSON.parse(String(data)));
        }
    });
});
//# sourceMappingURL=morphic-pack.js.map