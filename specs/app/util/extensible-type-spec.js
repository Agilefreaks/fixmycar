describe('ExtensibleType', function () {
  var subject;

  describe('mixin', function () {
    var implementation, ParentType;

    beforeEach(function () {
      implementation = {
        someFn: $.noop
      };

      ParentType = ExtensibleType.extend({});

      subject = function () {
        return ParentType.mixin(implementation);
      };
    });

    it('returns same type', function () {
      expect(subject()).toBe(ParentType);
    });

    it('extends prototype with new implementation', function () {
      expect(subject().prototype).toEqual(jasmine.objectContaining(implementation));
    });
  });
});
