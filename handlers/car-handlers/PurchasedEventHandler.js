const { carEvents } = require('../../events')
const { BaseEventHandler } = require('../../event-subsystem')

module.exports = class PurchasedEventHandler extends BaseEventHandler {
  constructor() {
    super(carEvents.PURCHASED_EVENT)
  }

  // noinspection JSMethodCanBeStatic
  execute(event) {
    if (!event || !event['model'] || !event['modelId']) {
      throw TypeError('The parameter must be a valid event')
    }

    return (
      'You have successfully purchased Item ' +
      event.modelId +
      ', a ' +
      event.model
    )
  }

  postExecute() {}
  preExecute() {}
}
