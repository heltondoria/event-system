const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect
chai.use(sinonChai)

const Invoker = require('../src/Invoker')
const EventHandler = require('../src/EventHandler')
const Enum = require('es6-enum')

let events = Enum('TEST_EVENT1', 'TEST_EVENT2', 'TEST_EVENT3')
let mockHandlers = {}

let handler1 = new EventHandler()
handler1.getEventId = () => {
  return events.TEST_EVENT1
}

Object.defineProperty(mockHandlers, events.TEST_EVENT1, {
  value: handler1,
  writable: true,
  enumerable: true,
  configurable: true
})

Object.defineProperty(mockHandlers, events.TEST_EVENT2, {
  value: {},
  writable: true,
  enumerable: true,
  configurable: true
})

let invoker = new Invoker(mockHandlers)

describe('When I create an instance of class Invoker', function() {
  it('should return a TypeError if the parameter of the constructor is null', function() {
    expect(() => new Invoker(null)).to.throw(
      TypeError,
      'Invoker needs a dictionary of handlers to work.'
    )
  })
})

describe('When I create an instance of class Invoker and call method "validateEvent()"', function() {
  it('should return a TypeError if the parameter is null', function() {
    expect(() => invoker.validateEvent(null)).to.throw(
      TypeError,
      'The parameter should not be null or undefined'
    )
  })

  it('should return a TypeError if the parameter does not have a property called "eventId"', function() {
    expect(() => invoker.validateEvent({})).to.throw(
      TypeError,
      'The parameter should have a property "eventId"'
    )
  })
})

describe('When I create an instance of class Invoker and call method "getHandler()"', function() {
  it('should return a TypeError if the selected handler does not extend EventHandler', function() {
    expect(() => invoker.getHandler({ eventId: events.TEST_EVENT2 })).to.throw(
      TypeError,
      'Event handler must extend EvenHandler class'
    )
  })

  it('should call the appropriated handler based on the given eventId', function() {
    let handler = invoker.getHandler({ eventId: events.TEST_EVENT1 })
    expect(handler.getEventId()).to.equal(events.TEST_EVENT1)
  })
})

describe('When I create an instance of class Invoker and call method "process()"', function() {
  it('should call handler methods in a specific order', function() {
    let handlers = {}
    let handler1 = new EventHandler(events.TEST_EVENT1)
    let spyPreExecute = sinon.spy(handler1, 'preExecute')
    let spyExecute = sinon.spy(handler1, 'execute')
    let spyPostExecute = sinon.spy(handler1, 'postExecute')

    Object.defineProperty(handlers, events.TEST_EVENT1, {
      value: handler1,
      writable: true,
      enumerable: true,
      configurable: true
    })

    let invoker = new Invoker(handlers)
    invoker.process({ eventId: events.TEST_EVENT1 })

    // eslint-disable-next-line
    expect(spyPreExecute).to.be.calledOnce
    expect(spyExecute).to.be.calledImmediatelyAfter(spyPreExecute)
    expect(spyPostExecute).to.be.calledImmediatelyAfter(spyExecute)

    spyPreExecute.restore()
    spyExecute.restore()
    spyPostExecute.restore()
  })

  it('should call handler.handleFailure() in case of an Error', function() {
    let handlers = {}
    let handler2 = new EventHandler(events.TEST_EVENT2)
    let err = new Error('Error')
    handler2.execute = function() {
      throw err
    }
    let spyHandleFailure = sinon.spy(handler2, 'handleFailure')

    Object.defineProperty(handlers, events.TEST_EVENT2, {
      value: handler2,
      writable: true,
      enumerable: true,
      configurable: true
    })

    let invoker = new Invoker(handlers)
    invoker.process({ eventId: events.TEST_EVENT2 })
    // eslint-disable-next-line
    expect(spyHandleFailure.calledOnce).to.be.true
    // eslint-disable-next-line
    expect(spyHandleFailure.calledWith(err)).to.be.true
    spyHandleFailure.restore()
  })
})
