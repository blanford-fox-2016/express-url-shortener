'use strict';
module.exports = function(sequelize, DataTypes) {
  var Url = sequelize.define('Url', {
    urls: DataTypes.STRING,
    short_url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Url;
};