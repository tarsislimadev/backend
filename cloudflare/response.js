import { Response as HttpResponse } from '..'

export class CloudflareResponse extends HttpResponse {
  getResponse() {
    const { body, headers, status } = this
    headers.append('Access-Control-Allow-Origin', '*')
    headers.append('Access-Control-Allow-Headers', '*')

    if (this.request.method == 'OPTIONS') {
      return new Response('', { headers, status: 200 })
    }

    return new Response(body, { headers, status })
  }
}
