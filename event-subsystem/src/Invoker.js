const EventHandler = require('./EventHandler')

module.exports = class Invoker {
  constructor(handlers) {
    if (!handlers) {
      throw new TypeError('Invoker needs a dictionary of handlers to work.')
    }
    this._handlers = handlers
  }

  process(event) {
    this.validateEvent(event)

    let handler = this.getHandler(event)

    try {
      handler.preExecute()
      handler.execute(event)
      handler.postExecute()
    } catch (error) {
      handler.handleFailure(error)
    }
  }

  getHandler(event) {
    let handler = this._handlers[event['eventId']]
    if (!(handler instanceof EventHandler)) {
      throw TypeError('Event handler must extend EvenHandler class')
    }
    return handler
  }

  validateEvent(event) {
    if (!event || !event['eventId']) {
      throw TypeError('The parameter should have a property "eventId"')
    }
  }
}
