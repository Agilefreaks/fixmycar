describe('ViewService', function () {
  var instance, $el, subject;

  beforeEach(function () {
    $el = $('<div></div>');
    instance = new ViewService($el);
  });

  describe('renderPage', function () {
    var pageType;

    beforeEach(function () {
      pageType = View.extend({});

      subject = function () {
        return instance.renderPage(pageType, {});
      }
    });
  });
});
