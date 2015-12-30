describe('ServiceContainer', function () {
  var instance, subject, SampleService;

  beforeEach(function () {
    SampleService = ExtensibleType.extend({});

    instance = new ServiceContainer();
  });

  afterEach(function () {
    instance.dispose();
  });

  describe('getService', function () {
    beforeEach(function () {
      subject = function () {
        return instance.getService('sampleService');
      };
    });

    it('raises error', function () {
      var exception;

      try {
        subject();
      } catch (e) {
        exception = e;
      }

      expect(exception).not.toBeUndefined();
    });

    describe('service has been registered', function () {
      var service;

      beforeEach(function () {
        service = new SampleService();
        instance.registerService('sampleService', service);
      });

      it('returns service', function () {
        expect(subject()).toBe(service);
      });
    });
  });

  describe('dispose', function () {
    beforeEach(function () {
      subject = function () {
        instance.dispose();
      };
    });

    describe('service is registered', function () {
      beforeEach(function () {
        instance.registerService('sampleService', new SampleService());
      });

      it('dose not raise exception', function () {
        subject();
      });

      describe('service has dispose method', function () {
        beforeEach(function () {
          _.extend(SampleService.prototype, {
            dispose: jasmine.createSpy('dispose')
          });
        });

        it('calls dispose on service', function () {
          subject();

          expect(SampleService.prototype.dispose).toHaveBeenCalled();
        });
      });
    });
  });
});
