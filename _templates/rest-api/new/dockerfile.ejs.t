---
to: <%=locals.in%>/<%=name%>/Dockerfile
---
from node:lts-apline

run usermod -d /home/<%= name %> -l <%= name %> node

copy . /home/<%= name %>

workdir /home/<%= name %>

cmd ["node", "lib/server.gen.js"]

user <%= name %>
