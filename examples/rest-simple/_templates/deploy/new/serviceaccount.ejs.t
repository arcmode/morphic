---
to: <%= locals.in %>/serviceaccount.yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: rest-simple
  labels:
    app.kubernetes.io/name: rest-simple
    app.kubernetes.io/instance: <%= h.instance() %>
    app.kubernetes.io/version: <%= h.version() %>
    app.kubernetes.io/managed-by: morphic
    app.kubernetes.io/part-of: rest-simple
