# @brtmvdl/backend

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
