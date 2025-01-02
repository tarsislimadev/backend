FROM node:alpine

WORKDIR /app

COPY . .

RUN node --version

WORKDIR /app/tests

RUN npm i

CMD sh index.sh
