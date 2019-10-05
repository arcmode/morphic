---
to: <%=locals.in%>/<%=name%>/__tests__/<%=name%>.spec.js
---
'use strict';

const { <%= h.changeCase.camel(name) %> } = require('..');

describe('<%= name %>', () => {
    it('needs tests');
});
