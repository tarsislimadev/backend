export class Router {
  requests = []

  request(method = 'GET', path = '/', fn = (() => { })) {
    this.requests.push({ method, path, fn })

    return this
  }

  get(path = '/', fn = (() => {})) {
    return this.request('GET', path, fn)
  }

  post(path = '/', fn = (() => {})) {
    return this.request('POST', path, fn)
  }
}
