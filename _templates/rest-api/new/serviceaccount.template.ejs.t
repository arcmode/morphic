---
to: <%= locals.in %>/<%= name %>/_templates/deploy/new/serviceaccount.ejs.t
---
---
to: <%%= locals.in %>/serviceaccount.yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: <%= name %>
  labels:
    app.kubernetes.io/name: <%= name %>
    app.kubernetes.io/instance: <%%= h.instance() %>
    app.kubernetes.io/version: <%%= h.version() %>
    app.kubernetes.io/managed-by: morphic
    app.kubernetes.io/part-of: <%= name %>
