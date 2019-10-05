---
to: <%= locals.in %>/<%= name %>/_templates/server/new/server.ejs.t
---
---
to: lib/server.gen.ts
---
import fastify from 'fastify';
import { createFastifyPlugin } from '@morphic/pack';

const instance = fastify({
    logger: true
});

//
// TODO: Add base plugins for initialization
//

<%% for(const pkg of h.config('morphic-pack-include')) { %>
instance.register(createFastifyPlugin(require.resolve('<%%= pkg %>/package.json')));
<%% } %>
const PORT = process.env.PORT
    ? Number(process.env.PORT)
    : 0;

instance.listen(PORT, (err: Error, address: string) => {
    if (err) {
        throw err;
    }
    instance.log.info(`server listening on ${address}`);
});
