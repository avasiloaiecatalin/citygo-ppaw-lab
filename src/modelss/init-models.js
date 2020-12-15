var DataTypes = require("sequelize").DataTypes;
var _clients = require("./clients");
var _scooters = require("./scooters");

function initModels(sequelize) {
  var clients = _clients(sequelize, DataTypes);
  var scooters = _scooters(sequelize, DataTypes);


  return {
    clients,
    scooters,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
