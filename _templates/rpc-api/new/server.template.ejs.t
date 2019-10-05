---
to: <%= locals.in %>/<%= name %>/_templates/server/new/server.ejs.t
---
---
to: lib/server.gen.ts
---
import express from 'express';
import { createRoutes } from '@morphic/rpc';
<%% for(const pkg of h.config('morphic-rpc-include')) { -%>
import * as <%%= h.changeCase.camel(pkg) %> from '<%%= pkg %>';
<%% } -%>


const app = express();
<%% for(const pkg of h.config('morphic-rpc-include')) { %>
app.use(createRoutes(<%%= h.changeCase.camel(pkg) %>));
<%% } %>
const listener = app.listen(process.env.PORT, () => {
    if (!listener) {
        throw new Error('Listener is null');
    }
    console.log('Server listening', listener.address());
});
