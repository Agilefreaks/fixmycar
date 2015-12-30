var serviceContainer;

beforeEach(function () {
  serviceContainer = new ServiceContainer();
  serviceContainer.registerService('viewService', new ViewService(helpers.$jasmineContent));

  window.App = {
    serviceContainer: serviceContainer
  };
});

afterEach(function () {
  serviceContainer.dispose();
});
