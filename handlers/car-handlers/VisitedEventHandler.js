const { carEvents } = require('../../events')
const { BaseEventHandler } = require('../../event-subsystem')

module.exports = class VisitedEventHandler extends BaseEventHandler {
  constructor() {
    super()
    super._eventId = carEvents.VISITED_EVENT
  }

  execute(event) {
    if (!event || !event['model'] || !event['modelId']) {
      throw TypeError('The parameter must be a valid event')
    }

    return (
      'The information for ' +
      event.model +
      ' with ID ' +
      event.modelId +
      ' is foobar'
    )
  }

  postExecute() {}
  preExecute() {}
}
