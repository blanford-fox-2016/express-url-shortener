var models = require('../models/index');
var Sequelize = require('sequelize');
var shortener = {};
var short = models.Short

shortener.shrink = function (source, callback) {
  var randomText = ""
  var possibility = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (var i = 0; i < 7; i++) {
    randomText += possibility.charAt(Math.ceil(Math.random()*possibility.length))
  }
  callback(source, randomText)
}

module.exports = shortener
