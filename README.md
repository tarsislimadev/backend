# @brtmvdl/backend

Easy Back-end Node.js library

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/brtmvdl/backend/npm-publish.yml?label=NPM%20package&link=https%3A%2F%2Fgithub.com%2Fbrtmvdl%2Fbackend%2Factions%2Fworkflows%2Fnpm-publish.yml)](https://github.com/brtmvdl/backend/actions/workflows/npm-publish.yml) [![github/license](https://img.shields.io/github/license/brtmvdl/backend)](https://img.shields.io/github/license/brtmvdl/backend) [![github/stars](https://img.shields.io/github/stars/brtmvdl/backend?style=social)](https://img.shields.io/github/stars/brtmvdl/backend?style=social)

## install

```bash
npm i @brtmvdl/backend
```

## how to use

```js
const { Server } = require('@brtmvdl/backend')

const server = new Server()

server.get('/', (req, res) => res.setJSON({ id: Date.now() }))

server.listen('8080')
```

## License

[MIT](./LICENSE)
