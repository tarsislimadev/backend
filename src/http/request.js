import { BREAK_LINE } from '../utils/constants.js'

export class HttpRequest {
  method = ''
  path = ''
  headers = {}
  body = ''

  constructor(chunk) {
    const buffer = chunk.toString()
    this.method = this.parseMethod(buffer)
    this.path = this.parseFullPath(buffer)
    this.headers = this.parseHeaders(buffer)
    this.body = this.parseBody(buffer)
  }

  parseLines(buffer) {
    return buffer.split(BREAK_LINE)
  }

  parseFirstLine(buffer) {
    return this.parseLines(buffer)[0]
  }

  parseSplittedFirstLine(buffer) {
    return this.parseFirstLine(buffer).split(' ')
  }

  parseMethod(buffer) {
    return this.parseSplittedFirstLine(buffer)[0]
  }

  parseFullPath(buffer) {
    return this.parseSplittedFirstLine(buffer)[1]
  }

  parsePath(buffer) {
    const [path] = this.parseFullPath(buffer).split('?')
    return path
  }

  parseHeaders(buffer) {
    const [allheaders,] = buffer.split(BREAK_LINE + BREAK_LINE)
    const [, headers] = allheaders.split(BREAK_LINE)
    return headers.reduce((hs, [key, value]) => ({ ...hs, [key]: value }), {})
  }

  parseBody(buffer) {
    const [,body] = buffer.split(BREAK_LINE + BREAK_LINE)
    return body
  }

}
