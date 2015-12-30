Router = Backbone.Router.extend({
  routes: {
    'dtcs': 'dtcs',
    '': 'home'
  },

  initialize: function () {
    this._viewService = App.serviceContainer.getService('viewService');
  },

  dtcs: function () {

  },

  home: function () {
    return this._viewService.renderPage(HomePage);
  },

  dispose: function () {
    this.stopListening();
    this.off();
  }
});
