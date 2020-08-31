#!/bin/bash

node -v
npm -v

npm config set registry http://registry.npmjs.org

npm install pm2 -g
npm i -g @nestjs/cli
npm i -g lerna

lerna bootstrap
lerna run build
lerna run pm2

pm2 startup
pm2 save
