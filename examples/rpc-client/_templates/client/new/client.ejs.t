---
to: lib/client.gen.ts
---
import { createClient } from '@morphic/rpc';
import * as source from '@morphic-examples/hello-rpc';

const rpc: typeof source = createClient(source, 'http://rpc-morphic-example-hello-rpc');
<% for(const item of h.source) { %>
export const <%= item %> = rpc.<%= item %>;
<% } %>