#!/bin/bash

cd packages/admin
yarn run build

cd ../client
yarn run build

cd ../server
yarn run build

cd ../../
echo "Build complete."
