#!/usr/bin/env bash

cmd_build_docker () {
    docker build -t $1\:latest $3 -f -<<EOF
from node:12-alpine as build
run apk add --no-cache yarn
run yarn global add lerna
user node
workdir /home/node
copy --chown=node:node . .
run find . -name "node_modules" -exec rm -rf '{}' +

run lerna bootstrap --scope $4
run lerna run build --scope $4

run find . -name "node_modules" -exec rm -rf '{}' +
run lerna bootstrap --scope $4 #-- --production #--no-optional

from node:12-alpine
user node
copy --from=build --chown=node:node /home/node /home/node
workdir /home/node$2
run rm -fr node_modules
run ln -s /home/node/node_modules /home/node$2/node_modules
cmd sh -c "npm start"
EOF
}

cmd_kind_load () {
    kind load docker-image $1\:latest --name frameless
}

cmd_kube_apply () {
    kubectl apply -f -
}

cmd_kube_clear () {
    kubectl delete deployment $1 2>/dev/null || true
    kubectl delete service $1 2>/dev/null || true
}

cmd_deploy () {
    cmd_build_docker "$@"
    cmd_kind_load "$@"
    cmd_kube_clear "$@"
    cmd_kube_apply "$@"
}

cmd_git () {
    git "$@"
}

case "$1" in
    deploy) shift;        cmd_deploy "$@" ;;
    build_docker) shift;  cmd_build_docker "$@";;
    kind_load) shift;     cmd_kind_load "$@";;
    kube_clear) shift;    cmd_kube_clear "$@";;
    kube_apply) shift;    cmd_kube_apply "$@";;
    *)                    cmd_git "$@" ;;

esac

exit 0
