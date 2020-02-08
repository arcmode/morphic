---
to: <%= locals.in %>/<%= name %>/_templates/server/new/server.ejs.t
---
---
to: lib/server.gen.ts
---
import fastify from 'fastify';
import { createFastifyPlugin } from '@morphic/rest';
import config from 'config';
//
// import rest modules
//
<%% for(const pkg of h.config('morphic-rest-include')) { -%>
import * as <%%= h.changeCase.camel(pkg) %> from '<%%= pkg %>';
<%% } -%>


const instance = fastify({
    logger: true
});

//
// TODO: Add base plugins for initialization
//

//
// add rest modules to the service
//
<%% for(const pkg of h.config('morphic-rest-include')) { %>
instance.register(createFastifyPlugin(<%%= h.changeCase.camel(pkg) %>, config));
<%% } %>
const PORT = String(
    config.has('PORT') ?
        config.get('PORT') :
        'PORT' in process.env ?
            process.env['PORT'] :
            '0'
);

instance.listen(parseInt(PORT, 10), (err: Error, address: string) => {
    if (err) {
        throw err;
    }
    instance.log.info(`server listening on ${address}`);
});
