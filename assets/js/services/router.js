Router = Backbone.Router.extend({
  routes: {
    'dtcs': 'dtcs',
    '*anything': 'home'
  },

  initialize: function () {
    this._viewService = App.serviceContainer.getService('viewService');
  },

  dtcs: function () {
    return this._viewService.renderPage(DtcsPage, {
      collection: new DtcCollection()
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
