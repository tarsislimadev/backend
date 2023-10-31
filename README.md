# [@brtmvdl/backend](https://www.npmjs.com/package/@brtmvdl/backend)

Easy Back-end Node.js library

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/brtmvdl/backend/npm-publish.yml?label=GitHub%20Actions&link=https%3A%2F%2Fgithub.com%2Fbrtmvdl%2Fbackend%2Factions%2Fworkflows%2Fnpm-publish.yml)](https://github.com/brtmvdl/backend/actions/workflows/npm-publish.yml) [![npm](https://img.shields.io/npm/dw/%40brtmvdl/backend?label=NPM%20Weekly%20Downloads)](https://www.npmjs.com/package/@brtmvdl/backend) [![github/stars](https://img.shields.io/github/stars/brtmvdl/backend?style=social)](https://img.shields.io/github/stars/brtmvdl/backend?style=social) 

## social & donate

[Donate](https://link.mercadopago.com.br/brtmvdl) - [Telegram](https://t.me/+KRmg5MlqgMk0MTg5) - [Discord](https://discord.gg/aD2pZr4A)

## how to install

```sh
# bash

npm i @brtmvdl/backend
```

## how to use

### package.json

```json
{
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  ...
}
```

### index.js

```js
import { Server } from '@brtmvdl/backend'

const server = new Server()

server.get('/', (req, res) => res.setJSON({ id: Date.now() }))

server.listen(80)
```

### node start

```sh
# bash

node index.js
```

## license

[MIT](./LICENSE)
