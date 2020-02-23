'use strict';

import { resolve } from 'path'
import { promises } from 'fs'
import { spawn } from 'child_process'
import YAML from 'yaml'

const THIS_DIR = resolve(__dirname)

type Options = {
    _: string[]
    name?: string
    path?: string
    context?: string
    n?: string
    p?: string
    c?: string
}

export async function ops(opts: Options) {
    const {
        path = '.',
        name = await resolveName(resolve(path)),
        context = '.',
        _ = []
    } = opts
    const pkg = await resolvePackage(resolve(path))
    const resolvedPath = resolve(path)
    const resolvedContext = resolve(context)
    const cmd = resolve(`${THIS_DIR}/../bin/ops.bash`)

    const [ op = 'test' ] = _

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
            ]

            const config = await resolveConfig(resolvedPath)

            return new Promise((resolve, reject) => {
                const op = spawn(cmd, args)
                op.stdin.write(genServiceDeployment({
                    config,
                    name,
                }))
                op.stdout.on('data', function (data) {
                    process.stdout.write(data)
                })
                op.stderr.on('error', function (err) {
                    process.stderr.write(err.name)
                    process.stderr.write(err.message)
                    process.stderr.write(err.stack || '<NO_STACK>')
                })
                op.on('close', function (code) {
                    if (code !== 0) {
                        console.log(`grep process exited with code ${code}`)
                        reject(code)
                    } else {
                        resolve(code)
                    }
                })
                op.stdin.end()
            })
        default:
            throw new Error(`NotImplemented: ${op}`)
    }
}

const resolveName = async (path: string) => {
    return (await resolvePackage(path)).replace(/^@[^\/]+\//, '')
}

const resolvePackage = async (path: string) => {
    const packageSrc = await promises.readFile(`${path}/package.json`)
    const packageData = JSON.parse(packageSrc.toString())
    return packageData['name']
}

const resolveConfig = async (path: string) => {
    const packageSrc = await promises.readFile(`${path}/package.json`)
    const packageData = JSON.parse(packageSrc.toString())
    const configs = []
    for (const key of Object.keys(packageData)) {
        if (/(rest|rpc)-include$/.test(key)) {
            const modules = packageData[key] as any[]
            for (const mod of modules) {
                const modSrc = await import(mod)
                if (modSrc.defaultConfig) {
                    configs.push(modSrc.defaultConfig)
                }
            }
        }
    }
    return Object.assign({}, ...configs)
}

const genServiceDeployment = ({ config, name }: { config: any, name: string }) => {
    console.log(config)
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
    ].map(item => YAML.stringify(item)).join('---\n')
}
