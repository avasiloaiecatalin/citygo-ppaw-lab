/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Rents = sequelize.define('rents', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    scooter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'scooters',
        key: 'id'
      },
      unique: "rents_ibfk_1"
    },
    date1: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    date2: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    renter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'clients',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'rents',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "scooter_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "scooter_id" },
        ]
      },
      {
        name: "FK_renter",
        using: "BTREE",
        fields: [
          { name: "renter" },
        ]
      },
    ]
  });
  await Rents.sync();
};
