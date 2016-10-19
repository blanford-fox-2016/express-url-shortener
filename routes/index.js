'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');
var mUrl = models.Url

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = req.body.url
  var output = ''

  mUrl.findAll().then(function(result) {
    res.render('index', { long : '', short : '', result });
  });


});

router.post('/', function(req, res, next) {
  var url = req.body.url;
  var shortUrl = "";
  function makeid(){
    var text = "http://PAPP.hacktiv/";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  shortUrl = makeid();

  mUrl.create({ long : url, short : shortUrl }, function(err){
    if (err) {
      console.log(err);
    }
  })



  mUrl.findAll().then(function(result) {
    res.render('index', { long: url, short : shortUrl, result });
  });

});



module.exports = router;
