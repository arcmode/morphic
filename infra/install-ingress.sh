#!/usr/bin/env sh
sudo helm upgrade\
    --install nginx-ingress stable/nginx-ingress\
    --set controller.service.type=NodePort\
    --set rbac.create=true\
    --set defaultBackend.enabled=false\
    --set controller.service.externalTrafficPolicy=Local\
    --set controller.hostNetwork=true\
    --set controller.dnsPolicy=ClusterFirstWithHostNet\
    --set controller.kind=DaemonSet\
    --set controller.daemonset.useHostPort=true\
    --set podSecurityPolicy.enabled=true\
    --set controller.extraArgs.publish-status-address=127.0.0.1\
    --set controller.extraArgs.enable-ssl-chain-completion=true
    # --set controller.configMapNamespace=default\
    # --set controller.scope.enabled=true\
    # --set controller.scope.namespace=default\
    # --namespace default\
    # --set controller.addHeaders.hello=world\
