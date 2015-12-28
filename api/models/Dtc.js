/**
* Dtc.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'dtcs',
  autoCreatedAt: true,
  autoUpdatedAt: true,

  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true
    },

    code: {
      type: 'string'
    },

    vehicle: {
      model: 'vehicle',
      columnName: 'vehicleVIN'
    }
  }
};

