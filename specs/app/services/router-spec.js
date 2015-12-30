describe('Router', function () {
  var instance, viewService, subject;

  beforeEach(function () {
    viewService = new ViewService($('<el></el>'));

    window.App = {
      serviceContainer: {
        getService: jasmine.createSpy('getService').and.returnValue(viewService)
      }
    };

    instance = new Router();
  });

  afterEach(function () {
    instance.dispose();
    delete window.App;
  });

  describe('navigate', function () {
    var route;

    beforeEach(function () {
      route = undefined;

      Backbone.history.start();

      subject = function () {
        var deferred = new $.Deferred();

        instance.once('route', function () {
          deferred.resolve();
        });

        instance.navigate(route, {trigger: true});

        return deferred.promise();
      };
    });

    afterEach(function () {
      Backbone.history.stop();
    });

    describe('route is /', function () {
      beforeEach(function () {
        route = '#/';
      });

      it('renders home', function (complete) {
        var renderPageSpy = spyOn(viewService, 'renderPage').and.callThrough();

        subject()
          .fail(helpers.expectNeverCalled)
          .done(function () {
            expect(renderPageSpy).toHaveBeenCalledWith(HomePage);
          })
          .always(complete);
      });
    });

    describe('route is /dtcs', function () {
      beforeEach(function () {
        route = '#/dtcs';
      });

      it('renders dtcs page', function (complete) {
        var renderPageSpy = spyOn(viewService, 'renderPage').and.callThrough();

        subject()
          .fail(helpers.expectNeverCalled)
          .done(function () {
            expect(renderPageSpy).toHaveBeenCalledWith(DtcsPage, jasmine.any(Object));
          })
          .always(complete);
      });
    });
  });
});
