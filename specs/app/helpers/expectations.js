window.helpers = window.helpers || {};

_.extend(window.helpers, {
  expectNeverCalled: function () {
    expect('Was called').toBe(false);
  }
});
