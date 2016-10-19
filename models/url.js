'use strict';
module.exports = function(sequelize, DataTypes) {
  var Url = sequelize.define('Url', {
    oldurl: {type: DataTypes.STRING, validate: {isUrl: true}},
    newurl: DataTypes.STRING,
    visited: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Url;
};
