const { carEvents } = require('../../../events/index')
const { BaseEventHandler } = require('../../../event-subsystem/index')

module.exports = class VisitedEventHandler extends BaseEventHandler {
  constructor() {
    super(carEvents.VISITED_EVENT)
  }

  // noinspection JSMethodCanBeStatic
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
