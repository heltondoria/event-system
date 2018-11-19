const { carHandlers } = require('../handlers/index')
const events = require('../events/index').carEvents
const { Invoker } = require('../event-subsystem/index')

const handlers = {}
for (let handlerName in carHandlers) {
  if (carHandlers.hasOwnProperty(handlerName)) {
    let handler = new carHandlers[handlerName]()
    Object.defineProperty(handlers, handler.getEventId(), {
      value: handler,
      writable: true,
      enumerable: true,
      configurable: true
    })
  }
}

const messages = [
  { eventId: events.BOOKED_EVENT, model: 'Ferrari', modelId: '14523' },
  { eventId: events.VISITED_EVENT, model: 'Ford Mondeo', modelId: '54323' },
  { eventId: events.BOOKED_EVENT, model: 'Ford Escort', modelId: '34232' },
  { eventId: events.VISITED_EVENT, model: 'Ford Escort', modelId: '34232' },
  { eventId: events.PURCHASED_EVENT, model: 'Ford Escort', modelId: '34232' },
  { eventId: events.BOOKED_EVENT, model: 'Porshe', modelId: '10270' },
  { eventId: events.PURCHASED_EVENT, model: 'Lamborgini', modelId: '91071' },
  { eventId: events.PURCHASED_EVENT, model: 'Fiat Argos', modelId: '83685' }
]

function* readMessage(messages) {
  for (let message of messages) {
    yield message
  }
}
let generator = readMessage(messages)

let invoker = new Invoker(handlers)

invoker.process(generator.next().value)
invoker.process(generator.next().value)
invoker.process(generator.next().value)
invoker.process(generator.next().value)
invoker.process(generator.next().value)
invoker.process(generator.next().value)
invoker.process(generator.next().value)
invoker.process(generator.next().value)
