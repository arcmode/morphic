import fastify from 'fastify';
import { createFastifyPlugin } from '@morphic/rest';
import config from 'config';
import * as morphicExamplesHelloRest from '@morphic-examples/hello-rest';

const instance = fastify({
    logger: true
});

//
// TODO: Add base plugins for initialization
//

instance.register(createFastifyPlugin(morphicExamplesHelloRest, config));

const PORT = config.has('PORT')
    ? parseInt(config.get('PORT'), 10)
    : 0;

instance.listen(PORT, (err: Error, address: string) => {
    if (err) {
        throw err;
    }
    instance.log.info(`server listening on ${address}`);
});
