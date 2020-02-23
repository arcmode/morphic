'use strict';

import { resolve } from 'path'
import { promises } from 'fs'

type Options = {
    _: string[]
    path?: string
    p?: string
}

type Runnable = {
    start: () => Promise<string>,
    stop: () => Promise<void>
}

export type Head<M, I extends Runnable, C> = {
    defaultConfig: C,
    createInstance: (mods: M[], conf: C) => I
}

export async function start<M, I extends Runnable, C>(opts: Options) {
    const {
        path = '.',
        _ = []
    } = opts
    const pkg = await resolvePackage(resolve(path))

    const [ headPkg, ...tailPkgs ] = await Promise.all(
        pkg['frameless'].map(
            async (pkg: string) => {
                try {
                    return await import(pkg)
                } catch {
                    return await import(resolve(path, pkg))
                }
            }
        )
    ) as [ Head<M, I, C>, ...M[]]

    return headPkg.createInstance(tailPkgs, headPkg.defaultConfig).start()
}

const resolvePackage = async (path: string) => {
    const packageSrc = await promises.readFile(`${path}/package.json`)
    return JSON.parse(packageSrc.toString())
}
