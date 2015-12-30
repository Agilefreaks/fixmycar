window.App = {
  init: function () {
    var $mainContent = $('#main-content');

    this.serviceContainer = new ServiceContainer();
    this.serviceContainer.registerService('viewService', new ViewService($mainContent));
    this.serviceContainer.registerService('router', new Router());

    Backbone.history.start();
  }
};

$(document).ready(function () {
  App.init();
});
