import netPkg from 'net'
import { HttpRequest } from './request.js'
import { HttpResponse } from './response.js'

export class Server {
  port = '80'

  requests = []

  addRequest(method = 'GET', path = '/', fn = (() => { })) {
    this.requests.push({ method, path, fn })
    return this
  }

  get(path = '/', fn = (() => { })) {
    return this.addRequest({ method: 'GET', path, fn })
  }

  post(path = '/', fn = (() => { })) {
    return this.addRequest({ method: 'POST', path, fn })
  }

  setPort(port = '80') {
    this.port = port
    return this
  }

  run(req, res) {
    return res
  }

  listen() {
    const server = netPkg.createServer((socket) => {
      socket.on('data', (buffer) => {
        const chunk = buffer.toString()
        const req = new HttpRequest(chunk)
        const res = new HttpResponse(req)
        socket.write(this.run(req, res).toString())
        socket.end()
      })
    })
  }
}
