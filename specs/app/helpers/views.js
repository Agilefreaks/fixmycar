window.helpers = window.helpers || {};

_.extend(window.helpers, {
  $jasmineContent: $('body'),

  renderView: function (view) {
    this.$jasmineContent.append(view.$el);
    return view.render().renderPromise;
  }
});
