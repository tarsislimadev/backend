import { Request as HttpRequest } from '..'
import { ApplicationError } from '../errors/index.js'

export class Response {
  status = 200
  headers = new Headers()
  body = ''

  request = null

  constructor(request = new HttpRequest('')) {
    this.request = request
  }

  setHeader(key, value) {
    this.headers.append(key, value)
    return this
  }

  getHeader(key, def = null) {
    return this.headers.get(key) || def
  }

  setJSON(json = {}, status = 200) {
    this.status = status
    this.headers.append('content-type', 'application/json')
    this.body = JSON.stringify(json, null, 4)
    return this
  }

  setError(error = new Error()) {
    if (error instanceof ApplicationError) {
      return this.setJSON(
        {
          status: 'error',
          message: error.getMessage(),
          data: error.getExtras(),
        },
        error.getStatus(),
      )
    }

    return this.setJSON(
      {
        status: 'error',
        message: error.message,
        data: {},
      },
      500,
    )
  }

}
