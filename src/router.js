import { HttpRequest } from './request.js'
import { HttpResponse } from './response.js'
import { NotFoundError } from '../libs/errors/index.js'

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
    const splited_request = req.pathname.split('/')
    const cur = this.requests.find((r) => {
      const isMethod = r.method === '*' || r.method === req.method
      const isPathname = r.pathname.split('/').every((p, ix) => {
        if (p === splited_request[ix]) return true
        if (p[0] === ':') return '' != splited_request[ix]
        return false
      })

      if (isMethod && isPathname) {
        req.pathname.split('/').every((p, ix) => {
          if (p[0] == ':') req.setParam(p.substring(1), splited_request[ix])
        })
      }

      return isMethod && isPathname
    })

    if (cur) return cur.fn(req, res)

    return res.setError(new NotFoundError(req.toJSON()))
  }
}
