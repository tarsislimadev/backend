import * as backend from '../'

export class CloudflareRequest extends backend.Request {
  constructor({ method, url, body } = {}) {
    super('')

    this.method = method
    this.body = this.parseBody(body)

    const requestURL = new URL(url)

    this.path = requestURL.pathname
    this.queries = new URLSearchParams()
    this.headers = new Headers()
    this.json = {}
  }

  parseBody(body) {
    if (typeof body === 'string') {
      return body
    }

    return ''
  }
}
