var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  var userSchema = {
    id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: 'datetime',
    updatedAt: 'datetime',
    name: {
      type: 'string',
      notNull: true
    },
    email: {
      type: 'string',
      notNull: true
    },
    phone: {
      type: 'string',
      notNull: true
    }
  };
  var vehicleSchema = {
    VIN: {
      type: 'string',
      primaryKey: true,
      notNull: true,
      unique: true
    },
    createdAt: 'datetime',
    updatedAt: 'datetime',
    name: {
      type: 'string',
      notNull: true
    },
    ownerId: {
      type: 'int',
      foreignKey: {
        name: 'vehicle_user_id_fk',
        table: 'users',
        mapping: 'id'
      }
    }
  };
  var dtcsSchema = {
    id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: 'datetime',
    updatedAt: 'datetime',
    code: {
      type: 'string',
      notNull: true
    },
    vehicleVIN: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'dtc_vehicle_vin_fk',
        table: 'vehicles',
        mapping: 'VIN'
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
