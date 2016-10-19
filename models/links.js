'use strict';
module.exports = function(sequelize, DataTypes) {
  var Links = sequelize.define('Links', {
    old_link: DataTypes.STRING,
    new_link: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Links;
};