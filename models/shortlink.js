'use strict';
module.exports = function(sequelize, DataTypes) {
  var shortlink = sequelize.define('shortlink', {
    originallink: DataTypes.TEXT,
    shortlink: DataTypes.TEXT,
    visitedtimes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return shortlink;
};