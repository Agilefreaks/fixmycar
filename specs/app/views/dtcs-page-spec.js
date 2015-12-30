fdescribe('DtcPage', function () {
  var instance, dtcCollection, subject;

  beforeEach(function () {
    dtcCollection = new DtcCollection();
    instance = new DtcsPage({collection: dtcCollection});
  });

  afterEach(function () {
    instance.teardown();
  });

  describe('render', function () {
    beforeEach(function () {
      subject = function () {
        return helpers.renderView(instance);
      };
    });

    describe('collection contains elements', function () {
      beforeEach(function () {
        dtcCollection.add({code: 'P1022'});
      });

      it('renders entries', function (complete) {
        subject()
          .fail(helpers.expectNeverCalled)
          .done(function () {
            expect(instance.$('.js-dtc-entries').children().length).toEqual(dtcCollection.length);
          })
          .always(complete);
      });
    });
  });
});
