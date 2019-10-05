---
to: <%=locals.in%>/<%=name%>/package.json
---
{
    "name": "<%= scope ? scope + '/' : '' %><%=name%>",
    "version": "0.0.0",
    "description": "> TODO: description",
    "author": "David Rojas Camaggi <drojascamaggi@gmail.com>",
    "homepage": "",
    "license": "ISC",
    "main": "lib/<%=name%>.js",
    "directories": {
        "lib": "lib",
        "test": "__tests__"
    },
    "files": [
        "lib"
    ],
    "scripts": {
        "build": "tsc",
        "pretest": "npm run build --scripts-prepend-node-path",
        "test": "jest",
        "build-debuggable": "npm run build --scripts-prepend-node-path -- --sourceMap false --inlineSourceMap true",
        "inspector": "node --inspect-brk node_modules/.bin/jest --runInBand",
        "debug": "npm run build-debuggable && npm run inspector"
    },
    "dependencies": {
        "@morphic-examples/rpc-client": "0.0.0",
        "@morphic-examples/hello-rpc": "0.0.0"
    },
    "devDependencies": {
        "jest": "24.9.0",
        "typescript": "3.7.2"
    }
}
