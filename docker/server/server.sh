#!/bin/sh
set -e

npm install

npm run build

npx typeorm migration:run

if [ "${NODE_ENV}" == "development" ]
then npm run start:dev;
else npm run start:prod;
fi;