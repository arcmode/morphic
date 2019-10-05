import { createClient } from '@morphic/rpc';
import * as source from '@morphic-examples/hello-rpc';

const rpc: typeof source = createClient(source, 'http://rpc-morphic-example-hello-rpc');

export const helloRpc = rpc.helloRpc;
