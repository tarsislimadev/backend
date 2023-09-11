import { CloudflareRequest, CloudflareResponse } from '@brtmvdl/backend/cloudflare'

import { NotFoundError } from '../errors/index.js'

export class Router {
  requests = []

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

    const cur = requests.find((r) => method == r.method && pathname == r.pathname)

    if (cur) return cur.fn(req, res)

    return res.setError(new NotFoundError({ method, pathname }))
  }
}
