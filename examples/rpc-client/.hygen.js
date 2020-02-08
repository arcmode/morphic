const package = require('./package.json');
const source = require('@frameless-examples/hello-rpc'); 

module.exports = {
    helpers: {
        config: s => package[s],
        source: Object.keys(source)
    }
}
