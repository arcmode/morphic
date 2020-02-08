import fastify from 'fastify';
import { createFastifyPlugin } from '@morphic/rest';
import config from 'config';
//
// import rest modules
//
import * as morphicExamplesHelloRest from '@morphic-examples/hello-rest';

const instance = fastify({
    logger: true
});

//
// TODO: Add base plugins for initialization
//

//
// add rest modules to the service
//

instance.register(createFastifyPlugin(morphicExamplesHelloRest, config));

const PORT = String(
    config.has('PORT') ?
        config.get('PORT') :
        'PORT' in process.env ?
            process.env['PORT'] :
            '0'
);

instance.listen(parseInt(PORT, 10), (err: Error, address: string) => {
    if (err) {
        throw err;
    }
    instance.log.info(`server listening on ${address}`);
});
