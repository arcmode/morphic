---
to: <%=locals.in%>/<%=name%>/lib/server.ts
---
import express from 'express'
import { createRoutes } from '@frameless/rpc'

export const defaultConfig = {
    PORT: '0'
}

export const createInstance = (modules: Parameters<typeof createRoutes>, conf: typeof defaultConfig) => {
    const app = express()

    for (const mod of modules) {
        app.use(createRoutes(mod))
    }

    let listener: any
    const start = () => {
        return new Promise((resolve, reject) => {
            listener = app.listen(parseInt(conf.PORT, 10), () => {
                if (listener) {
                    console.log('Server listening', listener.address())
                    resolve(listener.address())
                } else {
                    reject('Listener is null')
                }
            })
        })
    }

    const stop = async () => {
        return new Promise((resolve, reject) => {
            if (listener) {
                listener.close((err: Error) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
            }
        })
    }

    return {
        start,
        stop
    }
}
