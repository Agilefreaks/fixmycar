describe('View', function () {
  var instance, options, viewService, subject;

  beforeEach(function () {
    options = {};
    viewService = App.serviceContainer.getService('viewService');

    instance = new View();
  });

  afterEach(function () {
    instance.teardown();
    delete window.App;
  });

  describe('render', function () {
    beforeEach(function () {
      spyOn(viewService, 'renderTemplate').and.returnValue('');

      subject = function () {
        return helpers.renderView(instance);
      };
    });

    it('renders view', function (complete) {
      subject()
        .done(function () {
          expect(instance.rendered).toBe(true);
        })
        .always(complete);
    });

    describe('view needs to wait for a promise', function () {
      var deferred;

      beforeEach(function () {
        deferred = new $.Deferred();

        instance.populate = jasmine.createSpy('popuplate').and.returnValue(deferred.promise());
      });

      describe('promise is done', function () {
        beforeEach(function () {
          deferred.resolve();
        });

        it('renders view', function (complete) {
          subject()
            .fail(helpers.expectNeverCalled)
            .done(function () {
              expect(instance.rendered).toBe(true);
            })
            .always(complete);
        });
      });

      describe('promise is failed', function () {
        beforeEach(function () {
          deferred.reject();
        });

        it('renders view', function (complete) {
          subject()
            .done(helpers.expectNeverCalled)
            .fail(function () {
              expect(instance.rendered).not.toBe(true);
            })
            .always(complete);
        });
      });
    });
  });
});
