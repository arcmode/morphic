---
to: <%= locals.in %>/<%= name %>/_templates/deploy/new/service.ejs.t
---
---
to: <%%= locals.in %>/service.yaml
---
apiVersion: v1
kind: Service
metadata:
  name: <%= name %>
  labels:
    app.kubernetes.io/name: <%= name %>
    app.kubernetes.io/instance: <%%= h.instance() %>
    app.kubernetes.io/version: <%%= h.version() %>
    app.kubernetes.io/managed-by: morphic
    app.kubernetes.io/part-of: <%= name %>
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app.kubernetes.io/name: <%= name %>
    app.kubernetes.io/instance: kindly-nightingale