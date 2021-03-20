#!/bin/sh
set -e

npm install

npm run build

npx typeorm migration:run

npm run start:prod