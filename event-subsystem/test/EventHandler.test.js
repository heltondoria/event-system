const expect = require('chai').expect
const EventHandler = require('../src/EventHandler')

const event = 'ANYTHING'
let handler = new EventHandler(event)

describe('When I instantiate EventHandle and pass a constant in the constructor and access the getEventId function', function() {
  it('should return the constant given', function() {
    expect(handler.getEventId()).to.equal(event)
  })
})

describe('When I inspect the public interface of the object', function() {
  it('should have a "preExecute()" method', function() {
    expect(handler).to.have.property('preExecute')
  })

  it('should have an "execute()" method', function() {
    expect(handler).to.have.property('execute')
  })

  it('should have a "postExecute()" method', function() {
    expect(handler).to.have.property('postExecute')
  })

  it('should have a "handleFailure()" method', function() {
    expect(handler).to.have.property('handleFailure')
  })
})
