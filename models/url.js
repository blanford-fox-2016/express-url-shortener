'use strict';
module.exports = function(sequelize, DataTypes) {
  var Url = sequelize.define('Url', {
    urls: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
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
