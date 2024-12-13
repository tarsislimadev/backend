console.log('tests')

const { Server } = require('./index.js')

const server = new Server()

server.get('/', (_, res) => res)

server.listen(80)
