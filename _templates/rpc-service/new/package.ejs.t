---
to: <%=locals.in%>/<%=name%>/package.json
---
{
    "name": "<%= scope ? scope + '/' : '' %><%=name%>",
    "version": "0.0.0",
    "description": "RPC for ...",
    "author": "David Rojas Camaggi <drojascamaggi@gmail.com>",
    "homepage": "",
    "license": "ISC",
    "main": "lib/server.js",
    "directories": {
        "lib": "lib",
        "test": "__tests__"
    },
    "files": [
        "lib"
    ],
    "scripts": {
        "build": "tsc",
        "start": "start"
    },
    "frameless": [
        "./lib/server",
        "@frameless-examples/hello-rpc"
    ],
    "dependencies": {
        "@frameless-examples/hello-rpc": "0.0.0",
        "@frameless/rpc": "0.0.0",
        "@frameless/start": "0.0.0",
        "express": "4.17.1"
    },
    "devDependencies": {
        "@types/express": "4.17.1",
        "typescript": "3.7.5"
    }
}
