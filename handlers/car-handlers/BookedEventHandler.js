const {carEvents} = require('../../events');
const {BaseEventHandler} = require('../../event-subsystem');

module.exports = class BookedEventHandler extends BaseEventHandler {
  constructor() {
    super();
    super._eventId = carEvents.BOOKED_EVENT;
  }

  execute(event) {
    if (!event || !event['model'] || !event['modelId']) {
      throw TypeError("The parameter must be a valid event");
    }
    
    return ("You have successfully booked a viewing of " + event.model + " ( " + event.modelId + " ) ");
  }

  postExecute() {}
  preExecute() {}
};