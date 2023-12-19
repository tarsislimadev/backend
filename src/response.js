import { HttpRequest } from '../src/request.js'
import { ApplicationError } from '../errors/index.js'
import { BREAK_LINE } from './utils/constants.js'
import messages from './response.messages.js'
import mimes from './response.mimes.js'
import headers from './response.headers.js'
import fs from 'fs'

export class HttpResponse {
  status = '200'
  headers = new Headers()
  body = ''
  request = null

  constructor(request = new HttpRequest('')) {
    this.request = request
  }

  setStatus(status = '200') {
    this.status = status
    return this
  }

  parseContenType(file = '') {
    const [_, ext] = file.split('.')
    const mime = mimes[ext]
    if (!mime) return 'text/plain'
    return mime
  }

  setHeader(key, value) {
    this.headers.set(key, value)
    return this
  }

  getHeader(key, def = null) {
    return this.headers.get(key) || def
  }

  setFile(file, status = '200') {
    this.setStatus(status)
    this.setHeader(headers.ContentType, this.parseContenType(file))
    this.body = fs.readFileSync(file).toString()
    return this
  }

  setJSON(json = {}, status = '200') {
    this.setStatus(status)
    this.setHeader(headers.ContentType, 'application/json')
    this.body = JSON.stringify(json, null, 4)
    return this
  }

  setText(text = '', status = '200') {
    this.setStatus(status)
    this.setHeader(headers.ContentType, 'text/plain')
    this.body = text.toString()
    return this
  }

  setError(error = new Error()) {
    if (error instanceof ApplicationError) {
      return this.setJSON({ message: error.getMessage() }, error.getStatus())
    }

    return this.setJSON({ message: error.message }, '400')
  }

  redirect(pathname = '/', status = 302) {
    this.setStatus(status)
    this.setHeader(headers.Location, pathname)
    return this
  }

  getStatusMessage(status = '200') {
    const message = messages[status]
    if (!message) return 'Error'
    return message
  }

  getFirstLine(status = '200') {
    const first = []
    first.push(this.request.protocol)
    first.push(status)
    first.push(this.getStatusMessage(status))
    return first.join(' ')
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
    ].join(BREAK_LINE)
  }
}
