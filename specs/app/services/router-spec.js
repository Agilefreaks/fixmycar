describe('Router', function () {
  var instance, viewService, subject;

  beforeEach(function () {
    viewService = App.serviceContainer.getService('viewService');

    instance = new Router();
  });

  afterEach(function () {
    instance.dispose();
    delete window.App;
  });

  describe('navigate', function () {
    var route, renderPageSpy;

    beforeEach(function () {
      route = undefined;
      renderPageSpy = spyOn(viewService, 'renderPage').and.callThrough();

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

      describe('server returns dtcs', function () {
        var server, dtcs;

        beforeEach(function () {
          server = sinon.fakeServer.create();

          dtcs = [{
            code: 'P1011',
            vehicle: {
              VIN: "VN123",
              name: "BMW",
              createdAt: "2015-12-28T20:29:04.000Z",
              updatedAt: "2015-12-28T20:29:04.000Z",
              owner: 1
            }
          }];

          server.autoRespond = true;
          server.respondImmediately = true;
          server.respondWith('GET', '/v1/dtcs', [HttpStatusCodes.Ok, {ContentType: ContentTypes.Json}, JSON.stringify(dtcs)]);
        });

        afterEach(function () {
          server.restore();
        });

        it('renders dtcs page', function (complete) {
          subject()
            .fail(helpers.expectNeverCalled)
            .done(function () {
              expect(renderPageSpy).toHaveBeenCalledWith(DtcsPage, jasmine.objectContaining({collection: jasmine.any(DtcCollection)}));
            })
            .always(complete);
        });
      });
    });
  });
});
