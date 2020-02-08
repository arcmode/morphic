import fastify from 'fastify';
import { createFastifyPlugin } from '@frameless/pack';

const instance = fastify({
    logger: true
});

//
// TODO: Add base plugins for initialization
//


instance.register(createFastifyPlugin(require.resolve('@frameless-examples/hello-pack/package.json')));

const PORT = process.env.PORT
    ? Number(process.env.PORT)
    : 0;

instance.listen(PORT, (err: Error, address: string) => {
    if (err) {
        throw err;
    }
    instance.log.info(`server listening on ${address}`);
});
