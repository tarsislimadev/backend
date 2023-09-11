import { Request } from './request.js'
import { Response } from './response.js'

import { NotFoundError } from '../errors/index.js'

export class Router {
  requests = []

  request(method = 'GET', path = '/', fn = (() => { })) {
    this.requests.push({ method, path, fn })

    return this
  }

  get(path = '/', fn = (() => {})) {
    return this.request('GET', path, fn)
  }

  post(path = '/', fn = (() => {})) {
    return this.request('POST', path, fn)
  }

  run(req = new Request(), res = new Response) {
    const action = this.requests
      .find((request) => req.method == request.method && req.path == request.path)

    if (action) return action.fn(req, res)

    return res.setError(new NotFoundError(req.toJSON()))
  }
}
