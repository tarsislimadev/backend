import netPkg from 'net'
import { HttpRequest } from './request.js'
import { HttpResponse } from './response.js'
import { Router } from './router.js'

export class Server {
  port = 80
  router = new Router()

  addRequest(method = 'GET', path = '/', fn = (() => { })) {
    this.router.request(method, path, fn)
    return this
  }

  get(path = '/', fn = (() => { })) {
    this.router.get(path, fn)
    return this
  }

  post(path = '/', fn = (() => { })) {
    this.router.post(path, fn)
    return this
  }

  setPort(port = 80) {
    this.port = port
    return this
  }

  run(req, res) {
    return res
  }

  listen(port = this.port) {
    const server = netPkg.createServer((socket) => {
      socket.on('data', (buffer) => {
        console.log('buffer.string', buffer.toString())

        const req = new HttpRequest(buffer.toString())
        const res = new HttpResponse(req)
        const r = this.router.run(req, res)
        socket.write(r.toString())
        socket.end()
      })
    })

    server.listen(port, () => console.log(`listening on port ${port}`))
  }
}
