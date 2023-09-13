import { Response as HttpResponse  } from '..'

export class CloudflareResponse extends HttpResponse {
  getResponse() {
    if (this.request.method == 'OPTIONS') {
      const status = 200
      const headers = new Headers()
      headers.append('Access-Control-Allow-Origin', '*')
      headers.append('Access-Control-Allow-Headers', '*')
      return new Response('', { headers, status })
    }

    const { body, headers, status } = this

    return new Response(body, { headers, status })
  }
}
