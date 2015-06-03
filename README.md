# modella-computed

Define computed properties on modella models.

[![build status](https://travis-ci.org/deanlandolt/modella-computed.svg?branch=master)](https://travis-ci.org/deanlandolt/modella-computed)

## Usage

```js
var computed = require('modella-computed')
var Mustard = model('Mustard')
  .use(computed)
  .attr('color', {
    defaultValue: 'Golden'
  })
  .attr('flavor', {
    // defines a constant
    value: 'Spicy'
  })
  .attr('name', {
    // defines a getter, invoked with model bound as `this` context
    get: function () {
      return this.flavor() + ' ' + this.color()
    }
  })

var mustard = new Mustard({ color : 'Brown' });
mustard.name(); // 'Spicy Brown'

mustard.set({ color: 'Yellow' })
mustard.name(); // 'Spicy Yellow'
```
