
export class Request {
  method = null
  pathname = null
  queries = {}
  headers = new Headers()
  body = ''
  json = {}

  constructor(buffer = '', cancel = false) {
    if (!cancel) {
      const chunk = buffer.toString()
      this.method = this.parseMethod(chunk)
      this.pathname = this.parsePath(chunk)
      this.queries = this.parseQueries(chunk)
      this.headers = this.parseHeaders(chunk)
      this.body = this.parseBody(chunk)
      this.json = this.parseJSON(chunk)
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
    return 'GET'
  }

  parsePath(chunk) {
    return '/'
  }

  parseQueries(chunk) {
    return {}
  }

  parseHeaders(chunk) {
    return new Headers()
  }

  parseBody(chunk) {
    return '{}'
  }

  parseJSON(chunk) {
    try {
      return JSON.parse(this.parseBody(chunk))
    } catch (e) {
    }

    return {}
  }

  toJSON() {
    const { method, pathname: path, heders, body } = this

    return { method, path, heders, body }
  }
}
