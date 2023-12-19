import { HttpRequest } from './request.js'
import { HttpResponse } from './response.js'
import { NotFoundError } from '../errors/index.js'

export class Router {
  requests = []

  constructor() {
    this.request('OPTIONS', '*', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', req.getHeader('Access-Control-Allow-Origin', '*'))
      res.setHeader('Access-Control-Allow-Header', req.getHeader('Access-Control-Allow-Header', '*'))
      return res
    })
  }

  request(method = 'GET', pathname = '/', fn = (() => { })) {
    this.requests.push({ method, pathname, fn })

    return this
  }

  get(pathname = '/', fn = (() => { })) {
    return this.request('GET', pathname, fn)
  }

  post(pathname = '/', fn = (() => { })) {
    return this.request('POST', pathname, fn)
  }

  run(req = new HttpRequest(), res = new HttpResponse()) {
    return new Promise((s, f) => {
      const cur = this.requests.find((r) => {
        const isMethod = r.method === '*' || r.method === req.method
        const isPathname = r.pathname === '*' || r.pathname === req.path
        return isMethod && isPathname
      })

      if (cur) return s(cur.fn(req, res))

      f(new NotFoundError(req.toJSON()))
    })
  }
}
