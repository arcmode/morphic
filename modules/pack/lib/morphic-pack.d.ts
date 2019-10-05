/// <reference types="node" />
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { DefaultQuery, DefaultParams } from 'fastify';
import { Readable } from 'stream';
export declare type PackagerMod = {
    url: string;
    templates: string;
};
export declare const createFastifyPlugin: <Q extends DefaultQuery, P extends DefaultParams, O extends fp.PluginOptions>(pathToPackageFile: string) => (instance: FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse>, options: fp.PluginOptions, callback: (err?: import("fastify").FastifyError | undefined) => void) => void;
export declare const pack: <Q extends DefaultQuery, P extends DefaultParams, O extends fp.PluginOptions>(templates: string, input: {
    query: Q;
    params: P;
    options: O;
}) => Promise<Readable>;
export declare const genTempDir: (prefix: string) => Promise<string>;
export declare const generate: <Q extends DefaultQuery, P extends DefaultParams>(templates: string, cwd: string, query: Q, params: P, resource: "hygen" | "package") => Promise<string>;
export declare const genNpmPackage: (folder: string) => Promise<unknown>;
export declare const genHygenParams: <Q extends DefaultQuery, P extends DefaultParams>(query: Q, params: P) => string;
export declare const readPackageFile: (pathToPackageFile: string) => Promise<{
    morphic: PackagerMod;
}>;
//# sourceMappingURL=morphic-pack.d.ts.map