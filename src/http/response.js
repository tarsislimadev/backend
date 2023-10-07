import { ApplicationError } from '../errors/index.js'

import { HttpRequest } from './request.js'

export class HttpResponse {
  status = 200
  headers = new Headers()
  body = ''

  req = new HttpRequest('')

  constructor(req = new HttpRequest('')) {
    this.req = req
  }

  setJSON(json = {}, status = 200) {
    this.status = status
    this.headers.set('content-type', 'application/json')
    this.body = JSON.stringify(json, null, 4)
    return this
  }

  setError(e = new Error()) {
    let message = e.message
    this.status = 400
    this.headers.set('content-type', 'application/json')
    if (e instanceof ApplicationError) message = e.getMessage()
    this.body = JSON.stringify({ message }, null, 4)
    return this
  }
}
