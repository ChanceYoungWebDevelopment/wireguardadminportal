#! /bin/bash

mkdir -p ~/wgainfo/clientkeys/$1
cd ~/wgainfo/clientkeys/$1
wg genkey | tee privatekey | wg pubkey > publickey

