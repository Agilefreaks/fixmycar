ServiceContainer = ExtensibleType.extend({
  constructor: function () {
    this.registeredServices = [];
    this.serviceDictionary = {};
  },

  registerService: function (serviceName, instance) {
    this.serviceDictionary[serviceName] = instance;
    this.registeredServices.push({serviceName: serviceName, instance: instance});
  },

  getService: function (serviceName) {
    if (!this.serviceDictionary[serviceName]) {
      throw new Error('Service "' + serviceName + '" not registerd');
    }

    return this.serviceDictionary[serviceName];
  },

  dispose: function () {
    _(this.registeredServices)
      .reverse()
      .each(function (registeredService) {
        if (typeof registeredService.instance.dispose === 'function') registeredService.instance.dispose();
      }, this)
      .value();

    _.each(this.registeredServices, function (serviceName) {
      delete this.serviceDictionary[serviceName];
    }, this);

    this.serviceDictionary = {};
    this.registeredServices = [];
  }
});
