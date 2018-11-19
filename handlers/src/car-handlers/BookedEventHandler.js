const { carEvents } = require('../../../events/index')
const { BaseEventHandler } = require('../../../event-subsystem/index')

module.exports = class BookedEventHandler extends BaseEventHandler {
  constructor() {
    super(carEvents.BOOKED_EVENT)
  }

  // noinspection JSMethodCanBeStatic
  execute(event) {
    if (!event || !event['model'] || !event['modelId']) {
      throw TypeError('The parameter must be a valid event')
    }

    let result =
      'You have successfully booked a viewing of ' +
      event.model +
      ' ( ' +
      event.modelId +
      ' ) '
    console.log(result)
    return result
  }
}
