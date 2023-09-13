import { Request as HttpRequest } from '../'

export class CloudflareRequest extends HttpRequest {
  request = null

  constructor(request = new Request()) {
    super('', true)

    this.request = request
  }

  parsePath() {
    const pathURL = new URL(this.request.url)
    return pathURL.pathname
  }

  parseQueries(url) {
    return {}
  }

  parseHeaders(headers = new Headers()) {
    return headers
  }

  async parseBody(body) {
    if (body === null) {
      return await Promise.resolve('{}')
    }

    if (typeof body === 'string') {
      return await Promise.resolve(body)
    }

    const { value } = await body.getReader().read()
    return new TextDecoder().decode(value).toString()
  }

  parseJSON(body = '') {
    try {
      return JSON.parse(body)
    } catch (e) {
      // console.error(e)
    }

    return {}
  }

  async parseProperties() {
    this.method = this.request.method
    this.pathname = this.parsePath(this.request.url)
    this.queries = this.parseQueries(this.request.url)
    this.headers = this.parseHeaders(this.request.headers)
    this.body = await this.parseBody(this.request.body)
    this.json = this.parseJSON(this.body)
  }

}
