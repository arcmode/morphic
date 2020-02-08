import express from 'express';
import { createRoutes } from '@frameless/rpc';
import * as morphicExamplesHelloRpc from '@frameless-examples/hello-rpc';

const app = express();

app.use(createRoutes(morphicExamplesHelloRpc));

const listener = app.listen(process.env.PORT, () => {
    if (!listener) {
        throw new Error('Listener is null');
    }
    console.log('Server listening', listener.address());
});
