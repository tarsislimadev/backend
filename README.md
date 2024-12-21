# [abackend](https://www.npmjs.com/package/abackend)

Easy Back-end Node.js library

[![NPM Downloads by package author](https://img.shields.io/npm-stat/dw/tarsislimadev?label=NPM%20Downloads)](https://www.npmjs.com/package/abackend) [![github/stars](https://img.shields.io/github/stars/tarsislimadev/abackend?style=social)](https://img.shields.io/github/stars/tarsislimadev/abackend?style=social) 

## donate

[Donate](https://link.mercadopago.com.br/brtmvdl)

## how to install

### set up your project

```sh
# bash
npm init -y
```

### install the library

```sh
# bash
npm i abackend
```

### create your server

```js
// index.js

import { Server } from 'abackend'

const server = new Server()

server.get('/', (req, res) => res.setJSON({ id: Date.now() }))

server.listen(80)
```

### start your server

```sh
node index.js
```

## author

[@tarsislimadev](https://www.linkedin.com/in/tarsislimadev/)

## license

[MIT](./LICENSE)
