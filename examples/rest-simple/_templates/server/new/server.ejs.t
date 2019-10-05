---
to: lib/server.gen.ts
---
import fastify from 'fastify';
import { createFastifyPlugin } from '@morphic/rest';
<% for(const pkg of h.config('morphic-rest-include')) { -%>import * as <%= h.changeCase.camel(pkg) %> from '<%= pkg %>';
<% } -%>

const instance = fastify({
    logger: true
});

//
// TODO: Add base plugins for initialization
//
<% for(const pkg of h.config('morphic-rest-include')) { %>
instance.register(createFastifyPlugin(<%= h.changeCase.camel(pkg) %>));
<% } %>
const PORT = process.env.PORT
    ? Number(process.env.PORT)
    : 0;

instance.listen(PORT, (err: Error, address: string) => {
    if (err) {
        throw err;
    }
    instance.log.info(`server listening on ${address}`);
});
