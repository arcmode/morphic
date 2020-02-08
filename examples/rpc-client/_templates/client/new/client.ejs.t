---
to: lib/client.gen.ts
---
import { createClient } from '@frameless/rpc';
import * as source from '@frameless-examples/hello-rpc';

const rpc: typeof source = createClient(source, 'http://rpc-morphic-example-hello-rpc');
<% for(const item of h.source) { %>
export const <%= item %> = rpc.<%= item %>;
<% } %>