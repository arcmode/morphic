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
    "morphic": {
        "url": "/<%= name %>/:name/:of/:version",
        "templates": "_templates"
    },
    "directories": {
        "templates": "_templates"
    },
    "files": [
        "_templates"
    ]
}
