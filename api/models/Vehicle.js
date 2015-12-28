/**
* Vehicle.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },

    VIN: {
      type: 'string'
    },

    owner: {
      model: 'user'
    },

    DTCs: {
      collection: 'dtc',
      via: 'vehicle'
    }
  }
};

