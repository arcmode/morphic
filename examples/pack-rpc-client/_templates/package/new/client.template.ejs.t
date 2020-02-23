---
to: package/_templates/client/new/client.template.ejs.t
---
---
to: lib/client.gen.ts
---
import { createClient } from '@frameless/rpc';
import * as source from '<%%= of %>';

const rpc: typeof source = createClient(source, '<%%= url || 'http://' + of %>');
<%% for(const item of h.source) { %>
export const <%%= item %> = rpc.<%%= item %>;
<%% } %>