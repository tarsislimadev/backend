import { HttpRequest } from '../src/request.js'
import { ApplicationError } from '../errors/index.js'
import { BREAK_LINE } from './utils/constants.js'

export class HttpResponse {
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
    this.headers.set('content-type', 'application/json')
    this.body = JSON.stringify(json, null, 4)
    return this
  }

  setError(error = new Error()) {
    if (error instanceof ApplicationError) {
      return this.setJSON({ message: error.getMessage() }, error.getStatus())
    }

    return this.setJSON({ message: error.message }, 400)
  }

  toJSON() {
    const { status, headers, body, } = this
    return { status, headers, body, }
  }

  getStatusMessage(status = 200) {
    switch (status) {
      case 200: return 'OK'
      case 400: return 'CLIENT ERROR'
      case 404: return 'NOT FOUND'
      case 500: return 'SERVER ERROR'
    }

    return 'ERROR'
  }

  getFirstLine(status = 200) {
    return ['HTTP/1.1', status, this.getStatusMessage(status)].join(' ')
  }

  getHeaders() {
    return Array.from(this.headers).reduce((headers = [], [key, value]) => {
      headers.push([key, value].join(': '))
      return headers
    }, [])
  }

  toString() {
    return [
      this.getFirstLine(this.status),
      ...this.getHeaders(),
      '',
      this.body,
      '',
      ''
    ].join(BREAK_LINE)
  }
}
