DtcCollection = Collection.extend({
  model: Dtc,

  url: function () {
    return '/dtcs';
  }
});
