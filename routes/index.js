var express = require('express');
var router = express.Router();
var models = require('../models')
var Links = models.Link
var sequelize = require('sequelize')

/* GET home page. */
router.get('/', function(req, res, next) {

  Links.findAll().then(function (data) {
    res.render('index', { title: 'Short URL' , data: data});
  })

});

router.post('/urls', function (req, res, next) {
  var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  var short_url = ""
  var temp = ""

  for (var i = 0; i<5; i++) {
    short_url += char.charAt(Math.floor(Math.random() * char.length));
  }


  Links.findOne({
    where: {
      long_url: req.body.url
    }
  }).then(function (data) {
    temp = data.short_url
  }).catch(function (err) {
    Links.create({
      long_url: req.body.url,
      count: 0
    }).catch(function (err) {
      console.log(err.message)
    }).then(res.redirect(`/`))
  })



  Links.beforeCreate(function (link, options) {
    link.short_url = short_url
    return sequelize.Promise.resolve(link)
  })

})

router.get('/:short_url', function(req, res, next) {

  Links.findAll().then(function (data) {
    res.render('index', { title: 'Short URL', short_url: req.params.short_url , data: data});
  })

});

router.get('/update/:id/:url', function(req, res, next) {

  Links.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (data) {
    var temp = data.count
    Links.update({
      count: temp + 1
    }, {
      where: {
        id: req.params.id
      }
    }).catch(function (err) {
      res.send(err.message)
    }).then(res.redirect(`https://${req.params.url}`))
  })

});

module.exports = router;
