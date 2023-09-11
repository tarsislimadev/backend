import { Response as HttpResponse  } from '..'

export class CloudflareResponse extends HttpResponse {
  getResponse() {
    const { body, headers, status } = this

    return new Response(body, { headers, status })
  }
}
