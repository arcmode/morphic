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
    pkgs.mkcert
  ];

  shellHook =
    let
      setupNpm = writeScriptBin "setupNpm" ''
      mkcert -key-file key.pem -cert-file cert.pem npm.morphic.iolocalhost 127.0.0.1 &&\
      mkcert -install -cert-file cert.pem -key-file key.pem &&\
      npm config set registry https://localhost/npm &&\
      npm config --registry https://npm.morphic.io set cafile /home/$(whoami)/.local/share/mkcert/rootCA.pem &&\

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
        kind delete cluster --name="morphic"
    }

    up () {
        kind create cluster --name="morphic" --config ${kindConfig}
    }

    status () {
        kubectl cluster-info
    }

    bootstrap () {
        lerna bootstrap --use-workspaces
    }

    installIngress() {
        kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml

        kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/baremetal/service-nodeport.yaml

        kubectl patch deployments -n ingress-nginx nginx-ingress-controller -p '{"spec":{"template":{"spec":{"containers":[{"name":"nginx-ingress-controller","ports":[{"containerPort":80,"hostPort":80},{"containerPort":443,"hostPort":443}]}],"nodeSelector":{"ingress-ready":"true"},"tolerations":[{"key":"node-role.kubernetes.io/master","operator":"Equal","effect":"NoSchedule"}]}}}}'
    }

    trap down EXIT

    up
    status
    bootstrap
    # installIngress
    # ${setupNpm}/bin/setupNpm
  '';
}
