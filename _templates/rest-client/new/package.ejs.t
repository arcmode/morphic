---
to: <%=locals.in%>/<%=name%>/package.json
---
{
    "name": "<%= scope ? scope + '/' : '' %><%=name%>",
    "version": "0.0.0",
    "description": "REST client for ...",
    "author": "David Rojas Camaggi <drojascamaggi@gmail.com>",
    "homepage": "",
    "license": "ISC",
    "main": "lib/client.gen.js",
    "directories": {
        "lib": "lib",
        "test": "__tests__"
    },
    "files": [
        "lib"
    ],
    "scripts": {
        "prebuild": "HYGEN_OVERWRITE=1 npx hygen client new --at lib/client.gen.ts",
        "build": "tsc",
        "start": "node lib/client.gen.js",
        "debug": "tsc-watch --onSuccess \"node --inspect-brk lib/client.gen.js\"",
        "dev": "tsc-watch --onSuccess \"node lib/client.gen.js\""
    },
    "morphic-rest-include": [
        "@frameless-examples/hello-rest"
    ],
    "dependencies": {
        "axios": "*",
        "@frameless-examples/hello-rest": "0.0.0"
    },
    "devDependencies": {
        "tsc-watch": "4.0.0",
        "typescript": "3.7.5"
    }
}