const { Server } = require('abackend')

const server = new Server()

server.get('/', (_, res) => res)

server.listen(80)
