DtcCollection = Collection.extend({
  model: Dtc,

  url: function () {
    return '/v1/dtcs';
  }
});
