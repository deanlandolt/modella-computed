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
  t.equal(mustard.flavor(), 'Spicy')

  t.equal(mustard.get('color'), 'Golden')
  t.equal(mustard.color(), 'Golden')
  t.deepEqual(mustard.toJSON(), {
    color: 'Golden'
  })

  mustard = new Mustard({ color: 'Brown' })
  t.equal(mustard.color(), 'Brown')
  t.deepEqual(mustard.toJSON(), {
    color: 'Brown'
  })

  mustard.set({ color: 'Yellow' })
  t.equal(mustard.color(), 'Yellow')
  t.deepEqual(mustard.toJSON(), {
    color: 'Yellow'
  })

  mustard.set({ flavor: 'Umami' })
  t.equal(mustard.flavor(), 'Spicy')

  mustard = new Mustard({ flavor: 'Umami' })
  t.equal(mustard.flavor(), 'Spicy')
  t.equal(mustard.color(), 'Golden')

  t.end()
})

test('enumerable', function (t) {
  var Mustard = model('Mustard')
    .use(computed)
    .attr('flavor', { value: 'Spicy', enumerable: true })
    .attr('color', { value: 'Golden' })

  var mustard = new Mustard()
  t.equal(mustard.flavor(), 'Spicy')
  t.equal(mustard.color(), 'Golden')
  t.deepEqual(mustard.toJSON(), {
    flavor: 'Spicy'
  })
  var Mustard = model('Mustard')
    .use(computed)
    .attr('flavor', {
      get: function () {
        return 'Spicy'
      }
    })
    .attr('color', {
      get: function () {
        return 'Yellow'
      },
      enumerable: true
    })
    .attr('size')

  var mustard = new Mustard({ size: 1 })
  t.equal(mustard.flavor(), 'Spicy')
  t.equal(mustard.color(), 'Yellow')
  t.deepEqual(mustard.toJSON(), {
    color: 'Yellow',
    size: 1
  })

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
  t.equal(mustard.get('flavor'), 'Spicy')
  t.equal(mustard.get('color'), 'Golden')
  t.equal(mustard.get('name'), 'Spicy Golden')
  t.equal(mustard.name(), 'Spicy Golden')
  t.deepEqual(mustard.toJSON(), {
    flavor: 'Spicy',
    color: 'Golden'
  })

  var mustard = new Mustard({ color: 'Brown' })
  t.equal(mustard.name(), 'Spicy Brown')
  t.deepEqual(mustard.toJSON(), {
    flavor: 'Spicy',
    color: 'Brown'
  })

  mustard.set({ color: 'Yellow' })
  t.equal(mustard.name(), 'Spicy Yellow')
  t.deepEqual(mustard.toJSON(), {
    flavor: 'Spicy',
    color: 'Yellow'
  })

  t.end()
})

// TODO: test setters
