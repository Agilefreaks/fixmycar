DtcsPage = View.extend({
  template: 'dtcs-page',

  subViews: [],

  populate: function () {
    this.collection.each(function (entry) {
      this.attachSubView('.js-dtc-entries', new DtcEntry({model: entry}));
    }, this);
  }
});
