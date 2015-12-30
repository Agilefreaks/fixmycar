View = Backbone.View.extend({
  setup: $.noop,
  preRender: $.noop,
  postRender: $.noop,

  subViews: {},
  events: {},

  constructor: function (options) {
    Backbone.View.prototype.constructor.apply(this, [options]);
    this._viewService = App.serviceContainer.getService('viewService');
  },

  initialize: function (options) {
    Backbone.View.prototype.initialize.apply(this, [options]);
    this.subViews = _.clone(this.subViews);
    this.events = _.clone(this.events);
    this.bindings = _.clone(this.bindings);
    this.options = options;
    if (options && options.template) {
      this.template = options.template;
    }
    this.setup();
  },

  render: function () {
    var self = this;

    this.renderPromise = new $.Deferred();

    if (_.isFunction(this.populate)) {
      $.when(this.populate())
        .done(function () {
          self.renderCore(self.renderPromise);
        })
        .fail(function () {
          self.renderPromise.reject();
        });
    } else {
      self.renderCore(self.renderPromise);
    }

    return this;
  },

  renderCore: function (renderPromise) {
    this.preRender();

    this.el.innerHTML = this._viewService.renderTemplate(_.result(this, 'template'), {
      model: this.model,
      collection: this.collection,
      view: this
    });

    this.delegateEvents();
    this._bindModel();
    this.eachSubView(this.renderSubView);
    this.rendered = true;
    this.postRender();

    var childRenderPromises = _(this.getSubViews()).pluck('renderPromise').reject(_.isUndefined).value();
    $.when.apply(null, childRenderPromises).then(renderPromise.resolve, renderPromise.reject);
  },

  teardown: function () {
    this.eachSubView(function (viewObject) {
      viewObject.teardown();
    });
    this.undelegateEvents();
    this._unbindModel();
    this.off();
    this.remove();
    this.rendered = false;
  },

  eachSubView: function (f) {
    _.each(this.subViews, function (objectKey, selector) {
      if (_.isArray(objectKey)) {
        selector = objectKey[0];
        objectKey = objectKey[1];
      }
      var view = _.isObject(objectKey) ? objectKey : this[objectKey];
      f.apply(this, [view, selector]);
    }, this);
  },

  getSubViews: function () {
    return _.map(this.subViews, function (objectKey, selector) {
      if (_.isArray(objectKey)) {
        objectKey = objectKey[1];
      }
      return _.isObject(objectKey) ? objectKey : this[objectKey];
    }, this);
  },

  renderSubView: function (subView, selector) {
    var $target = this.$(selector);
    if ($target.length) {
      $target.append(subView.el);
      subView.render();
    }
  },

  attachSubView: function (selector, subView) {
    if (_.isArray(this.subViews)) {
      this.subViews.push([selector, subView]);
    } else {
      this.subViews[selector] = subView;
    }

    if (this.rendered) {
      this.renderSubView(subView, selector);
    }
  },

  haltEvent: function (e) {
    if (!e) return;

    e.preventDefault();
    e.stopPropagation();
  },

  _bindModel: function () {
    if (this.bindings) {
      this.stickit();
    }
  },

  _unbindModel: function () {
    if (this.bindings) {
      this.unstickit();
    }
  }
});
