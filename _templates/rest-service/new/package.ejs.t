---
to: <%=locals.in%>/<%=name%>/package.json
---
{
    "name": "<%= scope ? scope + '/' : '' %><%=name%>",
    "version": "0.0.0",
    "description": "REST for ...",
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
        "@frameless-examples/hello-rest"
    ],
    "dependencies": {
        "@frameless-examples/hello-rest": "0.0.0",
        "@frameless/rest": "0.0.0",
        "@frameless/start": "0.0.0",
        "fastify": "2.12.0"
    },
    "devDependencies": {
        "typescript": "3.7.5"
    }
}