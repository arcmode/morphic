---
to: hygen/package/.hygen.js
---
const source = require('<%= of %>'); 

module.exports = {
    helpers: {
        source: Object.keys(source)
    }
}