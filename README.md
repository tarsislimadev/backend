# [abackend](https://www.npmjs.com/package/abackend)

Easy Back-end Node.js library

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/tarsislimadev/backend/npm-publish.yml?label=GitHub%20Actions&link=https%3A%2F%2Fgithub.com%2Fabackend%2Factions%2Fworkflows%2Fnpm-publish.yml)](https://github.com/tarsislimadev/backend/actions/workflows/npm-publish.yml) [![npm](https://img.shields.io/npm/dw/%40tarsislimadev/backend?label=NPM%20Weekly%20Downloads)](https://www.npmjs.com/package/abackend) [![github/stars](https://img.shields.io/github/stars/tarsislimadev/backend?style=social)](https://img.shields.io/github/stars/tarsislimadev/backend?style=social) 

## social & donate

[Donate](https://link.mercadopago.com.br/brtmvdl) - [Telegram](https://t.me/+KRmg5MlqgMk0MTg5) - [Discord](https://discord.gg/2zWpWBgmPj)

## how to install

```sh
# bash
npm i abackend
```

## how to use

### package.json

```json
{
  "type": "module",
  ...
}
```

### write the server files

```js
// index.js

import { Server } from 'abackend'

const server = new Server()

server.get('/', (req, res) => res.setJSON({ id: Date.now() }))

server.listen(80)
```

### start

```sh
node index.js
```

## author

[@tarsislimadev](https://www.linkedin.com/in/tarsislimadev/)

## license

[MIT](./LICENSE)
