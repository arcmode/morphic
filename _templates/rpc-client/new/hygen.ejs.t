---
to: <%=locals.in%>/<%=name%>/.hygen.js
---
const package = require('./package.json');
const source = require('<%= of %>'); 

module.exports = {
    helpers: {
        config: s => package[s],
        source: Object.keys(source)
    }
}