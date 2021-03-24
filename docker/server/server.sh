#!/bin/sh
set -e

npm install

npm run build

npm run db:sync

if [ "${NODE_ENV}" == "development" ]
then npm run start:dev;
else npm run start:prod;
fi;