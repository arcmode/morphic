---
to: <%=locals.in%>/<%=name%>/__tests__/<%=name%>.spec.js
---
'use strict';

import { <%= h.changeCase.camel(of) %> } from '..';

describe('<%= name %>', () => {
    it('works', async () => {
        expect(
            await <%= h.changeCase.camel(of) %>('world')
        ).toBe('hello world');
    });
});
