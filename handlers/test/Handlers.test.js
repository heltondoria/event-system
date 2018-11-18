const expect = require('chai').expect
const { carHandlers } = require('../index')

let tests = [
  {
    handler: {
      class: carHandlers.BookedEventHandler,
      object: new carHandlers.BookedEventHandler(),
      cases: [
        { args: null, expected: 'The parameter must be a valid event' },
        { args: {}, expected: 'The parameter must be a valid event' },
        { args: {}, expected: 'The parameter must be a valid event' },
        {
          args: { model: 'camaro', modelId: '12345' },
          expected:
            'You have successfully booked a viewing of camaro ( 12345 ) '
        }
      ]
    }
  },
  {
    handler: {
      class: carHandlers.PurchasedEventHandler,
      object: new carHandlers.PurchasedEventHandler(),
      cases: [
        { args: null, expected: 'The parameter must be a valid event' },
        { args: {}, expected: 'The parameter must be a valid event' },
        { args: {}, expected: 'The parameter must be a valid event' },
        {
          args: { model: 'camaro', modelId: '12345' },
          expected: 'You have successfully purchased Item 12345, a camaro'
        }
      ]
    }
  },
  {
    handler: {
      class: carHandlers.VisitedEventHandler,
      object: new carHandlers.VisitedEventHandler(),
      cases: [
        { args: null, expected: 'The parameter must be a valid event' },
        { args: {}, expected: 'The parameter must be a valid event' },
        { args: {}, expected: 'The parameter must be a valid event' },
        {
          args: { model: 'camaro', modelId: '12345' },
          expected: 'The information for camaro with ID 12345 is foobar'
        }
      ]
    }
  }
]

// tests.forEach(function(test) {
//   it('of ' + test.args.class.name + ' should throw a TypeError', () => {
//     expect(() => test.args.handler.execute(test.handler.cases.event)).to.throw(
//       TypeError,
//       'The parameter must be a valid event'
//     )
//   })
// })

// function* getCases(cases) {
//   for (let testCase of cases) {
//     yield testCase
//   }
// }
// let testCase
tests.forEach(function(test) {
  describe(
    'When using a ' +
      test.handler.class.name +
      ' and calling the function "execute()" passing a event parameter',
    function() {
      this.slow(10)
      it('should throw a TypeError if the parameter is null', () => {
        expect(() =>
          test.handler.object.execute(test.handler.cases[0].args)
        ).to.throw(TypeError, test.handler.cases[0].expected)
      })
      it('should throw a TypeError if the parameter does not have a "model" property', function() {
        expect(() =>
          test.handler.object.execute(test.handler.cases[1].args)
        ).to.throw(TypeError, test.handler.cases[1].expected)
      })
      it('should throw a TypeError if the parameter does not have a "model" property', function() {
        expect(() =>
          test.handler.object.execute(test.handler.cases[2].args)
        ).to.throw(TypeError, test.handler.cases[2].expected)
      })
      it('should return an appropriated message if the parameter is valid object', function() {
        expect(test.handler.object.execute(test.handler.cases[3].args))
          .to.be.a('string')
          .and.to.equal(test.handler.cases[3].expected)
      })
    }
  )
})
