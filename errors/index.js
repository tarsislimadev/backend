
export class ApplicationError extends Error {
  status = 400
  extras = {}

  constructor(status = this.status, message = this.message, extras = this.extras) {
    super(message)
    this.status = status
    this.extras = extras
  }

  getStatus() {
    return this.status
  }

  getMessage() {
    return this.message
  }

  getExtras() {
    return this.extras
  }

  get(key) {
    return this.getExtras()[key]
  }
}

export class NotFoundError extends ApplicationError {
  constructor(extras = {}, message = 'Not found') {
    super(404, message, extras)
  }
}
