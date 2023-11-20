import { BREAK_LINE } from './utils/constants.js'

import { Headers } from './headers.js'

export class HttpRequest {
  method = null
  pathname = null
  // queries = {}
  headers = new Headers()
  body = ''
  // json = {}

  constructor(buffer = '', cancel = false) {
    if (!cancel) {
      const chunk = buffer.toString()
      this.method = this.parseMethod(chunk)
      this.pathname = this.parsePath(chunk)
      // this.queries = this.parseQueries(chunk)
      this.headers = this.parseHeaders(chunk)
      this.body = this.parseBody(chunk)
      // this.json = this.parseJSON(chunk)
    }
  }

  setHeader(key, value) {
    this.headers.append(key, value)
    return this
  }

  getHeader(key, def = null) {
    return this.headers.get(key) || def
  }

  parseMethod(chunk) {
    return this.parseSplittedFirstLine(chunk)[0]
  }

  parsePath(chunk) {
    const [headers,] = chunk.split(BREAK_LINE + BREAK_LINE)
    const [first_line,] = headers.split(BREAK_LINE)
    const [, fullpath,] = first_line.split(' ')
    const [path,] = fullpath.split('?', 2)
    return path
  }

  parseQueries(chunk) {
    return new URLSearchParams()
  }

  parseHeaders(chunk) {
    return new Headers()
  }

  parseBody(buffer) {
    const [, body] = buffer.split(BREAK_LINE + BREAK_LINE)
    return body
  }

  parseJSON(chunk) {
    try { return JSON.parse(this.parseBody(chunk)) }
    catch (e) { }

    return {}
  }

  parseLines(chunk) {
    return chunk.split(BREAK_LINE)
  }

  parseFirstLine(chunk) {
    return this.parseLines(chunk)[0]
  }

  parseSplittedFirstLine(chunk) {
    return this.parseFirstLine(chunk).split(' ')
  }

  parseFullPath(chunk) {
    return this.parseSplittedFirstLine(chunk)[1]
  }

  toJSON() {
    const { method, pathname: path, heders, body } = this

    return { method, path, heders, body }
  }
}
