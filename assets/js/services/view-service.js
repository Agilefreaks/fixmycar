ViewService = ExtensibleType.extend({
  constructor: function ($el) {
    this._$el = $el;
    this._currentPage = null;
  },

  renderPage: function (viewType, options) {
    var previousPage = this._currentPage;
    if (previousPage) {
      previousPage.$el.hide();
      previousPage.teardown();
    } else {
      this._$el.children().remove();
    }

    this.currentPage = new viewType(options);
    this._$el.append(this.currentPage.el);

    return this.currentPage.render().renderPromise;
  },

  getTemplate: function (templateName) {
    return JST[templateName];
    },

    renderTemplate: function (templateName, options) {
      if (!this.templateExists(templateName)) {
      throw new Error('Cannot find template ' + templateName);
    }

    var template = this.getTemplate(templateName);

    return template(options);
  },

  templateExists: function (templateName) {
    return this.getTemplate(templateName) !== undefined;
  }
});
