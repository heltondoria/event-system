const EventHandler = require('./EventHandler')

module.exports = class Invoker {
  constructor(handlers) {
    this._handlers = handlers
  }

  process(event) {
    if (!event || !event['eventId']) {
      throw TypeError('The parameter event must be an object of type Event')
    }

    let handler = this._handlers[event['eventId']]
    if (!(handler instanceof EventHandler)) {
      throw TypeError('Event handler must extend EvenHandler class')
    }

    try {
      handler.preExecute()
      console.log(handler.execute(event))
      handler.postExecute()
    } catch (error) {
      handler.handleFailure()
    }
  }
}
