var DataTypes = require("sequelize").DataTypes;
var _clients = require("./clients");
var _scooters = require("./scooters");
var _rents = require("./rents");

function initModels(sequelize) {
  var clients = _clients(sequelize, DataTypes);
  var scooters = _scooters(sequelize, DataTypes);
  var rents = _rents(sequelize, DataTypes);

  return {
    clients,
    scooters,
    rents
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
