#! /bin/bash

mkdir -p /home/chance/clientkeys/$1
cd /home/chance/clientkeys/$1
wg genkey | tee privatekey | wg pubkey > publickey

