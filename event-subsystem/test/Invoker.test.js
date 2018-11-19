const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const expect = require('chai').expect
const Invoker = require('../src/Invoker')
chai.use(sinonChai)
const Enum = require('es6-enum')

describe('When I create an instance of class Invoker', function() {
  it.skip('should return a TypeError if the parameter of the constructor is null', function() {
    expect(() => new Invoker(null)).to.throw(
      TypeError,
      'The parameter should be a map of handlers'
    )
  })
})

// Quando eu crio uma instância da classe Invoker e chamo o método process()
describe('When I create an instance of class Invoker and call method "process()"', function() {
  let events = Enum('TEST_EVENT1', 'TEST_EVENT2')
  let mockHandlers = [{ Event1: sinon.spy() }, { Event2: sinon.spy() }]
  let invoker = new Invoker(mockHandlers)

  it.skip('should return a TypeError if the parameter is null', function() {
    expect(() => invoker.process(null)).to.throw(
      TypeError,
      'The parameter should not be null or undefined'
    )
  })

  it.skip('should return a TypeError if the parameter does not have a property called "eventId"', function() {
    expect(() => invoker.process({})).to.throw(
      TypeError,
      'The parameter should have a property "eventId"'
    )
  })

  it('should return a TypeError if the selected handler does not extend EventHandler', function() {
    let handlers = {}
    Object.defineProperty(handlers, events.TEST_EVENT1, {
      value: {},
      writable: true,
      enumerable: true,
      configurable: true
    })
    let localInvoker = new Invoker(handlers)

    expect(() =>
      localInvoker.process({ eventId: events.TEST_EVENT1 })
    ).to.throw(TypeError, 'Event handler must extend EvenHandler class')
  })

  it.skip('should call the appropriated handler based on the given eventId', function() {
    expect()
  })
})
