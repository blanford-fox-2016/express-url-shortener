'use strict'

var express = require('express');
var router = express.Router();
var models = require('../models')
var link = models.Links
/* GET home page. */

//validasi shorten_url
router.get('/', function(req, res, next) {
  var url = req.params.url
  res.render('index', { title: 'MAKE YOURS URL SHORTHER'});
});

router.post('/url', (req, res) => {
  var shortUrl = "tn."
  var letter
  for(var i=0;i<5;i++){
    letter = Math.random().toString(36).substr(2, 1);
    shortUrl += letter
}
  var url = req.body.url
  link.create({
    old_link:url,
    new_link:shortUrl
  })
  //res.send(req.params.shortUrl)
  res.redirect(`/${shortUrl}`)
})

router.get('/:short_url', function(req, res, next) {
  //var url = req.params.short_url
  link.findAll({
  }).then(function (url) {
    res.render('index', { title: 'MAKE YOURS URL SHORTHER', shorten_url: url})
  });
});

module.exports = router;
