---
to: <%=locals.in%>/<%=name%>/_templates/hygen/new/hygen.template.ejs.t
---
---
to: hygen/package/.hygen.js
---
const source = require('<%%= of %>'); 

module.exports = {
    helpers: {
        source: Object.keys(source)
    }
}