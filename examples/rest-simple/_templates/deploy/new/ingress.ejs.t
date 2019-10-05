---
to: <%= locals.in %>/ingress.yaml
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: rest-simple-ingress
  labels:
    app.kubernetes.io/name: rest-simple
    app.kubernetes.io/instance: <%= h.instance() %>
    app.kubernetes.io/version: <%= h.version() %>
    app.kubernetes.io/managed-by: morphic
    app.kubernetes.io/part-of: rest-simple
  annotations:
    nginx.ingress.kubernetes.io/use-regex: "true"
spec:
  rules:
  - host: <%= host %>
    http:
      paths:
<% for(const pkg of h.config('morphic-rest-include')) { -%>      - path: <%= h.ingressPath(pkg) %>
        backend:
          serviceName: <%= pkg %>-service
          servicePort: 80
<% } %>
