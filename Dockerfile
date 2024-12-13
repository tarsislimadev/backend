FROM node:alpine

WORKDIR /app

COPY . .

RUN node --version

CMD node ./tests.js
