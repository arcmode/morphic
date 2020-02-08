import { createClient } from '@frameless/rpc';
import * as source from '@frameless-examples/hello-rpc';

const rpc: typeof source = createClient(source, 'http://rpc-morphic-example-hello-rpc');

export const helloRpc = rpc.helloRpc;
