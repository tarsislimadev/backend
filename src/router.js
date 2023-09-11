import { CloudflareRequest, CloudflareResponse } from '@brtmvdl/backend/cloudflare'

import { NotFoundError } from '../errors/index.js'

export class Router {
  requests = []

  request(method = 'GET', path = '/', fn = (() => { })) {
    this.requests.push({ method, path, fn })

    return this
  }

  get(path = '/', fn = (() => { })) {
    return this.request('GET', path, fn)
  }

  post(path = '/', fn = (() => { })) {
    return this.request('POST', path, fn)
  }

  run(req = new CloudflareRequest(), res = new CloudflareResponse()) {
    const { requests } = this

    const { method, pathname } = req

    const cur = requests.find((request) => method == request.method && pathname == request.pathname)

    if (cur) return cur.fn(req, res)

    return res.setError(new NotFoundError({ method, pathname }))
  }
}
