/**
* Vehicle.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'vehicles',
  autoCreatedAt: true,
  autoUpdatedAt: true,
  autoPK: false,

  attributes: {
    VIN: {
      type: 'string',
      unique: true,
      primaryKey: true
    },

    name: {
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

