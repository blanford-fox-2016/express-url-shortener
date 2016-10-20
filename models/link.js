'use strict';
module.exports = function(sequelize, DataTypes) {
  var Link = sequelize.define('Link', {
    long_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    short_url: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Link;
};