---
to: <%= locals.in %>/<%= name %>/_templates/client/new/client.ejs.t
---
---
to: lib/client.gen.ts
---
import { createRouteClient } from '@frameless/client';
/*
 * import rest modules
 */
<%% for(const pkg of h.config('morphic-rest-include')) { -%>
import * as <%%= h.changeCase.camel(pkg) %> from '<%%= pkg %>';
<%% } -%>


/*
 * TODO: Add base plugins for initialization
 */

/*
 * add rest modules to the service
 */
export const createClient = (baseUrl: string) => {
    return {
<%% for(const pkg of h.config('morphic-rest-include')) { -%>
        <%%= h.changeCase.camel(pkg) %>: createRouteClient(
            baseUrl,
            <%%= h.changeCase.camel(pkg) %>
        ),
    };
<%% } %>
};