const { carEvents } = require('../../../events/index')
const { BaseEventHandler } = require('../../../event-subsystem/index')

module.exports = class PurchasedEventHandler extends BaseEventHandler {
  constructor() {
    super(carEvents.PURCHASED_EVENT)
  }

  // noinspection JSMethodCanBeStatic
  execute(event) {
    if (!event || !event['model'] || !event['modelId']) {
      throw TypeError('The parameter must be a valid event')
    }

    let result =
      'You have successfully purchased Item ' +
      event.modelId +
      ', a ' +
      event.model
    console.log(result)
    return result
  }
}
