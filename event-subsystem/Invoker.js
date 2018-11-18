module.exports = class Invoker {
    constructor(handlers) {
        this._handlers = handlers
    }

    process(event) {
        if (!event || !event['eventId']) {
             throw TypeError('The parameter event must be an object of type Event')
        }

        let handler = this._handlers[event['eventId']];
        try {
            handler.preExecute();
            console.log(handler.execute(event));
            handler.postExecute()
        } catch (error) {
            handler.handleFailure()
        } 
    }
};