const backend = require('../src')

class CloudflareResponse extends backend.Response {
  getResponse() {
    const { body, headers, status } = this

    return new Response(body, { headers, status })
  }
}

module.exports = { CloudflareResponse }
