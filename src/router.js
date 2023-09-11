import { CloudflareRequest, CloudflareResponse } from '@brtmvdl/backend/cloudflare'

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

    const cur = requests.find((request) => req.method == request.method && req.pathname == request.pathname)

    if (cur) return cur.fn(req, res)

    return res.setError(new Error('not found'))
  }
}
