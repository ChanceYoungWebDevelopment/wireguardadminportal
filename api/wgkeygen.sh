#! /bin/bash

mkdir -p ~/wireguardadmininfo/clientkeys/$1
cd ~/wireguardadmininfo/clientkeys/$1
wg genkey | tee privatekey | wg pubkey > publickey

