---
to: <%=locals.in%>/<%=name%>/.hygen.js
---
const package = require('./package.json');

module.exports = {
    helpers: {
        config: s => package[s]
    }
}