Router = Backbone.Router.extend({
  routes: {
    'dtcs': 'dtcs',
    '*anything': 'home'
  },

  initialize: function () {
    this._viewService = App.serviceContainer.getService('viewService');
  },

  dtcs: function () {
    var self = this;
    var dtcs = new DtcCollection();

    return dtcs.fetch()
      .then(function () {
        return self._viewService.renderPage(DtcsPage, {collection: dtcs});
      });
  },

  home: function () {
    return this._viewService.renderPage(HomePage);
  },

  dispose: function () {
    this.stopListening();
    this.off();
  }
});
