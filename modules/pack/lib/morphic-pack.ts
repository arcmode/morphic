import {
    FastifyInstance
} from 'fastify';
import fp, { PluginOptions, nextCallback } from 'fastify-plugin';
import { DefaultQuery, DefaultParams } from 'fastify';
import { Readable } from 'stream';
import { exec } from 'child_process';
import { mkdtemp, createReadStream, readFile, unlink, promises } from 'fs';
import { tmpdir } from 'os';
import { join, dirname } from 'path';
import { runner } from 'hygen';

// TODO: write cli first and then use same cli to build/replace @frameless-examples/pack-service
// TODO: move this to @frameless-examples/pack-head
export type PackagerMod = {
    url: string,
    templates: string
}
export const createFastifyPlugin = <
    Q extends DefaultQuery,
    P extends DefaultParams,
    O extends PluginOptions
>(pathToPackageFile: string) => fp(async (
    server: FastifyInstance,
    options: PluginOptions,
    done: nextCallback
) => {
    const pkg = await readPackageFile(pathToPackageFile);
    const templatesAbsolutePath = join(dirname(pathToPackageFile), pkg.morphic.templates);
    server.log.debug('Packaging...', {
        pkg,
        templatesAbsolutePath
    });
    server.route({
        method: 'GET',
        url: pkg.morphic.url,
        handler: async (req, reply) => {
            const result: Readable = await pack(
                templatesAbsolutePath,
                {
                    query: req.query as Q,
                    params: req.params as P,
                    options: options as O
                }
            );
            reply.send(result)
        }
    });
    done();
});

export const pack = async <
    Q extends DefaultQuery,
    P extends DefaultParams,
    O extends PluginOptions
>(templates: string, input: { query: Q, params: P, options: O }): Promise<Readable> => {
    const folder: string = await genTempDir('morphic-');
    const hygenDir = `${folder}/hygen`;

    await generate(templates, folder, input.query, input.params, 'hygen');
    await generate(templates, hygenDir, input.query, input.params, 'package');

    const pkgDir = `${hygenDir}/package`;
    const file = await genNpmPackage(pkgDir);
    const filepath = `${pkgDir}/${file}`;

    return new Promise((resolve, reject) => {
        const stream = createReadStream(filepath).on('end', () => {
            unlink(filepath, (err) => {
                if (err) {
                    throw new Error('CANNOT UNLINK')
                };
            });
        });
        resolve(stream)
    });
};

export const genTempDir = (prefix: string) => new Promise<string>(
    (resolve, reject) => {
        mkdtemp(join(tmpdir(), prefix), (err, folder) => {
            if (err) {
                reject(err);
            } else {
                resolve(folder);
            }
        });
    }
);

export const generate = <
    Q extends DefaultQuery,
    P extends DefaultParams
>(
    templates: string,
    cwd: string,
    query: Q,
    params: P,
    resource: 'hygen' | 'package'
) => {
    // const environ = `HYGEN_TMPLS=${templates}`;
    const baseCmd = `${resource} new`;
    const fullCmd = `${baseCmd} ${genHygenParams(query, params)}`;
    const log = console.log.bind(console);
    const err = console.error.bind(console);
    return runner(fullCmd.split(' '), {
        templates,
        cwd,
        logger: {
            ...console,
            err,
            ok: log,
            notice: log,
            colorful: log
        },
        debug: !!process.env.DEBUG,
        exec: (action, body) => {
            const opts = body && body.length > 0 ? { input: body } : {}
            return require('execa').shell(action, opts)
        },
        createPrompter: () => require('enquirer'),
    })
}

export const genNpmPackage = (folder: string) => new Promise((resolve, reject) => {
    exec('npm pack', { cwd: folder }, (err, stdout, _stderr) => {
        if (err) {
            reject(err);
        } else {
            resolve(stdout.trim());
        }
    })
});

export const genHygenParams = <
    Q extends DefaultQuery,
    P extends DefaultParams
>(
    query: Q,
    params: P
) => Object.entries({ ...params, ...query }).reduce(
    (acc, [k, v]) => `${acc} --${k} ${v}`, ''
);

export const readPackageFile = (pathToPackageFile: string) => new Promise<{ morphic: PackagerMod }>((resolve, reject) => {
    readFile(pathToPackageFile, (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(JSON.parse(String(data)));
        }
    })
});
