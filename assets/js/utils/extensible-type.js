ExtensibleType = function () {
  this.initialize && this.initialize.apply(this, arguments);
  this._super = this.constructor.__super__;
};

_.extend(ExtensibleType, {
  extend: Backbone.Model.extend,

  mixin: function (impl) {
    _.extend(this.prototype, impl);

    return this;
  }
});

