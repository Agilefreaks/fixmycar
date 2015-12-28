var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  var userSchema = {
    id: {type: 'int', primaryKey: true},
    name: 'string',
    email: 'string',
    phone: 'string'
  };
  var vehicleSchema = {
    id: {type: 'int', primaryKey: true},
    name: 'string',
    VIN: 'string',
    owner: {
      type: 'int',
      foreignKey: {
        name: 'vehicle_user_id_fk',
        table: 'users',
        mapping: 'id'
      }
    }
  };
  var dtcsSchema = {
    id: {type: 'int', primaryKey: true},
    code: 'string',
    vehicle: {
      type: 'int',
      foreignKey: {
        name: 'dtc_vehicle_id_fk',
        table: 'vehicles',
        mapping: 'id'
      }
    }
  };

  db.createTable('users', userSchema, function (err) {
    if (err) return callback(err);

    db.createTable('vehicles', vehicleSchema, function (err) {
      if (err) return callback(err);

      db.createTable('dtcs', dtcsSchema, callback);
    });
  });
};

exports.down = function(db, callback) {
  db.dropTable('dtcs', function (err) {
    if (err) return callback(err);

    db.dropTable('vehicles', function (err) {
      if (err) return callback(err);

      db.dropTable('users', callback);
    });
  });
};
