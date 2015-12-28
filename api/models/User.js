/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'users',
  autoCreatedAt: true,
  autoUpdatedAt: true,

  attributes: {
    name: {
      type: 'string'
    },

    email: {
      type: 'string'
    },

    phone: {
      type: 'string'
    },

    vehicles: {
      collection: 'vehicle',
      via: 'owner'
    }
  }
};

