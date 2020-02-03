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
    "main": "lib/server.gen.js",
    "directories": {
        "lib": "lib",
        "test": "__tests__"
    },
    "files": [
        "lib"
    ],
    "scripts": {
        "prebuild": "HYGEN_OVERWRITE=1 npx hygen server new --at lib/server.gen.ts",
        "predeploy": "HYGEN_OVERWRITE=1 npx hygen deploy new --in deploy --host $<%= h.changeCase.snake(name).toUpperCase() %>_HOST",
        "build": "tsc",
        "start": "node lib/server.gen.js",
        "debug": "tsc-watch --onSuccess \"node --inspect-brk lib/server.gen.js\"",
        "dev": "tsc-watch --onSuccess \"node lib/server.gen.js\""
    },
    "morphic-rest-include": [
        "@morphic-examples/hello-rest"
    ],
    "dependencies": {
        "fastify": "2.10.0",
        "@morphic-examples/hello-rest": "0.0.0",
        "@morphic/rest": "0.0.0",
        "config": "3.2.5"
    },
    "devDependencies": {
        "@types/config": "0.0.36",
        "tsc-watch": "4.0.0",
        "typescript": "3.7.5"
    }
}