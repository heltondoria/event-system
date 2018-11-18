module.exports = class EventHandler {
  constructor() {
    this._eventId = 'undefined'
  }

  getEventId() {
    return this._eventId
  }

  preExecute() {
    console.log('Called preExecute method from super')
  }

  execute(event) {}

  postExecute() {
    console.log('Called postExecute method from super')
  }

  handleFailure() {
    console.log('Called handleFailure method from super')
  }
}
