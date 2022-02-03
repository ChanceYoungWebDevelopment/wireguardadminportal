#! /bin/bash

mkdir -p ./clientkeys/$1
cd ./clientkeys/$1
wg genkey | tee privatekey | wg pubkey > publickey

