import express from 'express';
import { createRoutes } from '@morphic/rpc';
import * as morphicExamplesHelloRpc from '@morphic-examples/hello-rpc';

const app = express();

app.use(createRoutes(morphicExamplesHelloRpc));

const listener = app.listen(process.env.PORT, () => {
    if (!listener) {
        throw new Error('Listener is null');
    }
    console.log('Server listening', listener.address());
});
