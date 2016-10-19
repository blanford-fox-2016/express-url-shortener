var express = require('express');
var router = express.Router();
var helper = require('../helpers/shortener');
var models = require('../models')
var short = models.Short


/* GET home page. */
router.get('/', function(req, res, next) {
  var dbcontent = []
      short.findAll({}).then(function(data){
        for (var i = 0; i < data.length; i++) {
          dbcontent.push(data[i].dataValues)
        }
        res.render('index', {title: 'Cool Shortener', dbcontent })
    })
  })

router.post('/urls', function(req, res, next) {
  var dbcontent = []
  helper.shrink(req.body.urltoshorten, function(source, randomText) {
    short.create({
      name: 'cool/'+randomText,
      link: source,
      click_count: 0
    }).then(function(){
        short.findAll({}).then(function(data){
          for (var i = 0; i < data.length; i++) {
            dbcontent.push(data[i].dataValues)
          }
          res.render('index', {title: 'Cool Shortener', dbcontent })
      })
    })
  })
})


router.get('/:urls', function(req, res, next) {
  // console.log(req.params.urls);
  // short.findOne({
  //   where:{link: req.params.urls}
  // }).then(function (data) {
  //   var update_cc = data.dataValues.click_count + 1
  //   short.update({
  //     click_count: update_cc
  //   }).then(function() {
  //     res.redirect('/')
  //   })
  // })
  res.send(`routing to ${req.params.id} does good`)
})

module.exports = router;
