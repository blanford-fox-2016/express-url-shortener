var express = require('express');
var router = express.Router();
var model = require('../models');
var sequelize = require('sequelize');
var sequelize = new sequelize({"storage": "db/sql.db",
"dialect": "sqlite"})
var url = model.Url;

let randomString = () =>{
  var hasil = ["sy.ly/"];
  for (var i = 0; i < 5; i++) {
    if (i%2 == 0){
      x = String.fromCharCode(Math.ceil(Math.random()*(90-65)+65))
      hasil.push(x);
    } else if(i%3 === 0){
      x = Math.ceil(Math.random()*9)
      hasil.push(x);
    } else {
      x = String.fromCharCode(Math.ceil(Math.random()*(122-97)+97))
      hasil.push(x);
    }
  }
  return hasil.join("")
}

let insertData = (oldurl, newurl) =>{
  url.create({
    oldurl: oldurl,
    newurl: newurl
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'URL Shortener' });
});

router.post('/urls', (req, res) =>{
  res.redirect(`/${req.body.url}`)
});

router.get('/:short_url', (req, res, next) => {
  let url = req.params.short_url
  let short = randomString()
  insertData(url, short);
  res.render('index', { title: 'URL Shortener', short, url });
});


module.exports = router;
