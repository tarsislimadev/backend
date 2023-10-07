
export default class ApplicationError extends Error {
  status = 400
  extras = {}

  constructor(message = 'Application error', status = this.status, extras = this.extras) {
    super(message)
    this.status = status
    this.extras = extras
  }

  getMessage() {
    return this.message
  }

  getStatus() {
    return this.status
  }

  getExtras() {
    return this.extras
  }
}
