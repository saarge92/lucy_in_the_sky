FROM node:15.12.0-alpine3.10

WORKDIR /usr/src/app

EXPOSE 3000

ENTRYPOINT ["sh", "/usr/src/app/docker/server/server.sh"]

