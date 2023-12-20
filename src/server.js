import netPkg from 'net'
import { HttpRequest } from './request.js'
import { HttpResponse } from './response.js'
import { Router } from './router.js'

export class Server {
  port = 80
  router = new Router()
  server = null

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
    return this.router.run(req, res)
  }

  createServer() {
    const self = this

    return netPkg.createServer((socket) => {
      socket.on('data', (buffer) => {
        const req = new HttpRequest(buffer.toString())
        const res = new HttpResponse(req)
        res.on('data', (r) => socket.write(r.toString()))
        res.on('end', () => socket.end())
        self.router.run(req, res)
          .catch((err) => res.setError(err))
          .finally(() => res.end())
      })
    })
  }

  setServer(server = null) {
    this.server = server ? server : this.createServer()
    return this
  }

  getServer() {
    if (!(this.server)) this.setServer()
    return this.server
  }

  listen(port = this.port) {
    this.getServer().listen(port, () => console.log(`listening on port ${port}`))
    return this
  }
}
