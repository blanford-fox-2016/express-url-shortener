'use strict';
module.exports = function(sequelize, DataTypes) {
  var Short = sequelize.define('Short', {
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    click_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Short;
};
