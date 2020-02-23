{ pkgs ? import <nixpkgs> {} }:

let
  unstable = import (fetchTarball https://nixos.org/channels/nixos-unstable/nixexprs.tar.xz) { };
in

with pkgs;

mkShell {
  buildInputs = [
    nodejs-12_x
    nodePackages.lerna
    nodePackages.yarn
    unstable.kubectl
    unstable.kind
    unstable.kubernetes-helm
    unstable.kompose
    pkgs.mkcert
  ];

  shellHook =
    let
      setupNpm = writeScriptBin "setupNpm" ''
      mkcert -key-file key.pem -cert-file cert.pem npm.frameless.iolocalhost 127.0.0.1 &&\
      mkcert -install -cert-file cert.pem -key-file key.pem &&\
      npm config set registry https://localhost/npm &&\
      npm config --registry https://npm.frameless.io set cafile /home/$(whoami)/.local/share/mkcert/rootCA.pem &&\

      kubectl create namespace npm;
      kubectl create secret tls npm --key ./key.pem --cert ./cert.pem --namespace npm &&\
      helm install npm charts/verdaccio/ --namespace npm
      '';
      kindConfig = writeTextFile {
        name = "kindConfig.yaml";
        text = ''
        kind: Cluster
        apiVersion: kind.x-k8s.io/v1alpha4
        nodes:
        - role: control-plane
          kubeadmConfigPatches:
          - |
            kind: InitConfiguration
            nodeRegistration:
              kubeletExtraArgs:
                node-labels: "ingress-ready=true"
                authorization-mode: "AlwaysAllow"
          extraPortMappings:
          - containerPort: 80
            hostPort: 80
            protocol: TCP
          - containerPort: 443
            hostPort: 443
            protocol: TCP
        '';
      };
    in ''
    down () {
        kind delete cluster --name="frameless"
    }

    up () {
        kind create cluster --name="frameless" --config ${kindConfig}

        helm repo add confluentinc https://confluentinc.github.io/cp-helm-charts/
        helm repo update

        helm install kafka --set cp-kafka-rest.enabled=false,cp-kafka-connect.enabled=false,cp-kafka-ksql-server.enabled=false confluentinc/cp-helm-charts
    }

    status () {
        kubectl cluster-info
    }

    bootstrap () {
        lerna bootstrap --use-workspaces
    }

    deploy () {
        lerna run deploy --stream
    }

    trap down EXIT

    up
    status
    bootstrap
    deploy
  '';
}
