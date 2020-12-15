var DataTypes = require("sequelize").DataTypes;
var _clients = require("./clients");
var _scooters = require("./scooters");
var _rents = require("./rents");
var _bookings = require("./book")

function initModels(sequelize) {
  var clients = _clients(sequelize, DataTypes);
  var scooters = _scooters(sequelize, DataTypes);
  var rents = _rents(sequelize, DataTypes);
  var bookings = _bookings(sequelize, DataTypes);

  return {
    clients,
    scooters,
    rents,
    bookings
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
