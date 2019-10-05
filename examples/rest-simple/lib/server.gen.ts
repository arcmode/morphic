import fastify from 'fastify';
import { createFastifyPlugin } from '@morphic/rest';
import * as morphicExamplesHelloRest from '@morphic-examples/hello-rest';

const instance = fastify({
    logger: true
});

//
// TODO: Add base plugins for initialization
//

instance.register(createFastifyPlugin(morphicExamplesHelloRest));

const PORT = process.env.PORT
    ? Number(process.env.PORT)
    : 0;

instance.listen(PORT, (err: Error, address: string) => {
    if (err) {
        throw err;
    }
    instance.log.info(`server listening on ${address}`);
});
