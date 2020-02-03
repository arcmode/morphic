{ pkgs ? import <nixpkgs> {} }:

with pkgs;

mkShell {
  buildInputs = [
    nodejs-12_x
    nodePackages.lerna
    nodePackages.yarn
  ];

  shellHook = ''
    bootstrap () {
      lerna bootstrap --use-workspaces
    }

    bootstrap
  '';
}
