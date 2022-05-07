#! /bin/bash

cd /apps/wipi
git checkout main
git pull

pnpm install
pnpm run build

pm2 reload @wipi/server
pm2 reload @wipi/client
pm2 reload @wipi/admin
