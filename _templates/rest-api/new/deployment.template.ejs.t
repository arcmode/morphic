---
to: <%= locals.in %>/<%= name %>/_templates/deploy/new/deployment.ejs.t
---
---
to: <%%= locals.in %>/deployment.yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <%= name %>
  labels
    app.kubernetes.io/name: <%= name %>
    app.kubernetes.io/instance: <%%= h.instance() %>
    app.kubernetes.io/version: <%%= h.version() %>
    app.kubernetes.io/managed-by: morphic
    app.kubernetes.io/part-of: <%= name %>
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: <%= name %>
      app.kubernetes.io/instance: <%%= h.instance() %>
  template:
    metadata:
      labels:
        app.kubernetes.io/name: <%= name %>
        app.kubernetes.io/instance: <%%= h.instance() %>
    spec:
      serviceAccountName: <%%= h.instance() %>
      containers:
        - name: <%= name %>
          image: "<%%= image %>"
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /
              port: http
          readinessProbe:
            httpGet:
              path: /
              port: http