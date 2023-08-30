const backend = require('../src')

class CloudflareResponse extends backend.Response {
  getResponse() {
    return new Response('Cloudflare Response!')
  }
}

module.exports = { CloudflareResponse }
