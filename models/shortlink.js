'use strict';
module.exports = function(sequelize, DataTypes) {
  var shortlink = sequelize.define('shortlink', {
    originallink: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true
      }
    },
    shortlink: {
      type: DataTypes.TEXT,
      // validate: {
      //   isUnique: isUnique("shortlinks", "shortlink")
      // }
    },
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
//
// let isUnique = (modelName, field) => {
//   return (value, next) => {
//     var Model = require("./")[modelName];
//     var query = {};
//     query[field] = value;
//     Model.find({where: query, attributes: ["shortlink"]}).then((obj) => {
//       if (obj) {
//         next(field + ' "' + value + '" is already in use');
//       } else {
//         next();
//       }
//     });
//   };
// }
