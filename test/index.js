var model = require('modella')
var test = require('tape')
var computed = require('../')

test('values', function (t) {
  var Mustard = model('Mustard')
    .use(computed)
    .attr('flavor', { value: 'Spicy' })
    .attr('color', { defaultValue: 'Golden' })

  var mustard = new Mustard()
  t.equal(mustard.get('flavor'), 'Spicy')
  t.equal(mustard.get('color'), 'Golden')
  t.equal(mustard.flavor(), 'Spicy')
  t.equal(mustard.color(), 'Golden')

  mustard = new Mustard({ color: 'Brown' })
  t.equal(mustard.flavor(), 'Spicy')
  t.equal(mustard.color(), 'Brown')

  mustard.set({ color: 'Golden' })
  t.equal(mustard.flavor(), 'Spicy')
  t.equal(mustard.color(), 'Golden')

  t.end()
})

test('getters', function (t) {
  var Mustard = model('Mustard')
    .use(computed)
    .attr('flavor', { defaultValue: 'Spicy' })
    .attr('color', { defaultValue: 'Golden' })
    .attr('name', {
      get: function () {
        return this.flavor() + ' ' + this.color()
      }
    })

  var mustard = new Mustard()
  t.equal(mustard.flavor(), 'Spicy')
  t.equal(mustard.color(), 'Golden')
  t.equal(mustard.name(), 'Spicy Golden')

  var mustard = new Mustard({ color: 'Brown' })
  t.equal(mustard.flavor(), 'Spicy')
  t.equal(mustard.color(), 'Brown')
  t.equal(mustard.name(), 'Spicy Brown')

  mustard.set({ color: 'Golden' })
  t.equal(mustard.flavor(), 'Spicy')
  t.equal(mustard.color(), 'Golden')
  t.equal(mustard.name(), 'Spicy Golden')

  t.end()
})

// TODO: test setters
