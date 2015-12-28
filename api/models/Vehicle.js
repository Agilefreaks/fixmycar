/**
* Vehicle.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'vehicles',

  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true
    },

    name: {
      type: 'string'
    },

    VIN: {
      type: 'string'
    },

    owner: {
      model: 'user',
      columnName: 'ownerId'
    },

    DTCs: {
      collection: 'dtc',
      via: 'vehicle'
    }
  }
};

