module.exports = class EventHandler {
  constructor(eventId) {
    this._eventId = eventId
  }

  getEventId() {
    return this._eventId
  }

  preExecute() {}

  execute(event) {}

  postExecute() {}

  handleFailure() {}
}
