# modella-computed

Define computed properties on modella models.

[![build status](https://travis-ci.org/deanlandolt/modella-computed.svg?branch=master)](https://travis-ci.org/deanlandolt/modella-computed)

## Usage

```js
var computed = require('modella-computed')
var Mustard = model('Mustard')
  .use(computed)
  .attr('flavor', {
    defaultValue: 'Spicy'
  })
  .attr('color', {
    // defines a constant on model `attrs`
    value: 'Golden'
  })
  .attr('name', {
    // defines a getter on model `attrs`, invoked with model as context
    get: function () {
      return this.flavor() + ' ' + this.color()
    }
  })

var mustard = new Mustard({ color : 'Brown' });

mustard.name(); // 'Spicy Brown'
```
