// index.js

import { Server } from 'abackend'

const server = new Server()

server.get('/', (req, res) => res.setJSON({ id: Date.now() }))

server.listen(80).then(() => fetch('http://localhost:80')).then((res) => res.json()).then((json) => console.log({ port: 80, json }))

server.listen(8080).then(() => fetch('http://localhost:8080')).then((res) => res.json()).then((json) => console.log({ port: 8080, json }))
