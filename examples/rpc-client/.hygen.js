const package = require('./package.json');
const source = require('@morphic-examples/hello-rpc'); 

module.exports = {
    helpers: {
        config: s => package[s],
        source: Object.keys(source)
    }
}