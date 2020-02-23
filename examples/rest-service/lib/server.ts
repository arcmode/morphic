import fastify from 'fastify'
import { createFastifyPlugin } from '@frameless/rest'

export const defaultConfig = {
    PORT: '0'
}

export const createInstance = (modules: Parameters<typeof createFastifyPlugin>[0][], config: any) => {
    const instance = fastify({
        logger: true
    })
    for (const mod of modules) {
        instance.register(createFastifyPlugin(mod, config))
    }

    const start = () => {
        return new Promise((resolve, reject) => {
            instance.listen(parseInt(config.PORT, 10), (err: Error, address: string) => {
                if (err) {
                    reject(err)
                } else {
                    instance.log.info(`server listening on ${address}`)
                    resolve(address)
                }
            })
        })
    }

    const stop = async () => {
        await instance.close()
    }

    return {
        start,
        stop
    }
}
