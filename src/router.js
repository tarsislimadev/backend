import { CloudflareRequest, CloudflareResponse } from '@brtmvdl/backend/cloudflare'

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

  run(req = new CloudflareRequest(), res = new CloudflareResponse()) {
    const { requests } = this

    const { method, pathname } = req

    const cur = requests.find((r) => {
      const isMethod = r.method === '*' || r.method === method
      const isPathname = r.pathname === '*' || r.pathname === pathname
      return isMethod && isPathname
    })

    if (cur) return cur.fn(req, res)

    return res.setError(new NotFoundError({ method, pathname }))
  }
}
