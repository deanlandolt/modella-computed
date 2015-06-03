module.exports = function (Model) {

  Model.on('initialize', function (model) {

    Object.keys(Model.attrs).forEach(function (key) {
      var options = Model.attrs[key]
      var descriptor

      if (Object.hasOwnProperty.call(options, 'value')) {
        descriptor || (descriptor = {})
        descriptor.value = options.value
      }

      if (typeof options.get === 'function') {
        descriptor || (descriptor = {})
        descriptor.get = options.get.bind(model)
      }

      if (typeof options.set === 'function') {
        descriptor || (descriptor = {})
        descriptor.set = options.set.bind(model)
      }

      if (descriptor) {
        descriptor.enumerable = true
        Object.defineProperty(model.attrs, key, descriptor)
      }
    })

  })

}
