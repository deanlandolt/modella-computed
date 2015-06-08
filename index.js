module.exports = function (Model) {

  Model.on('initialize', function (model) {

    Object.keys(Model.attrs).forEach(function (key) {
      var options = Model.attrs[key]

      if (Object.hasOwnProperty.call(options, 'value')) {
        return Object.defineProperty(model.attrs, key, {
          value: options.value,
          enumerable: true
        })
      }

      if (typeof options.get === 'function') {
        var descriptor = {}
        descriptor.get = options.get.bind(model)

        if (typeof options.set === 'function') {
          descriptor.set = options.set.bind(model)
        }
        return Object.defineProperty(model.attrs, key, descriptor)
      }
    })

  })

}
