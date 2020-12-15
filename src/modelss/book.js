/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = async function(sequelize, DataTypes) {
  const Bookings = sequelize.define('bookings', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    scooter_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    booked_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'bookings',
    timestamps: false,
  });
  await Bookings.sync({alter:true});
  return Bookings;
};
