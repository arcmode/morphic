---
to: <%= locals.in %>/<%= name %>/_templates/client/new/client.ejs.t
---
---
to: lib/client.gen.ts
---
import { createClient } from '@morphic/rpc';
import * as source from '<%= of %>';

const rpc: typeof source = createClient(source, '<%= url %>');
<%% for(const item of h.source) { %>
export const <%%= item %> = rpc.<%%= item %>;
<%% } %>