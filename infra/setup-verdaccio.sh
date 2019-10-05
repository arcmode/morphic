#!/usr/bin/env sh

kubectl delete namespace npm;
kubectl create namespace npm;

mkcert -key-file key.pem -cert-file cert.pem npm.morphic.io &&\
    mkcert -install -cert-file cert.pem -key-file key.pem &&\
    npm config set registry https://localhost/npm &&\
    npm config --registry  https://npm.morphic.io set cafile /home/$(whoami)/.local/share/mkcert/rootCA.pem &&\

    kubectl create secret tls npm --key ./key.pem --cert ./cert.pem --namespace npm &&\
    helm install npm charts/verdaccio/ --namespace npm
