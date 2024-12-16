# [abackend](https://www.npmjs.com/package/abackend)

Easy Back-end Node.js library

[![NPM Downloads by package author](https://img.shields.io/npm-stat/dw/tarsislimadev?label=NPM%20Downloads)](https://www.npmjs.com/package/abackend) [![github/stars](https://img.shields.io/github/stars/tarsislimadev/abackend?style=social)](https://img.shields.io/github/stars/tarsislimadev/abackend?style=social) 

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
