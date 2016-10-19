var express = require('express');
var router = express.Router();
let models = require('../models')
let Urls = models.Url
let sequelize = require('sequelize')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shorten URL' });
});

let random_url = () => {
  let result = ''
  result += String.fromCharCode(Math.floor(Math.random()*9)+49)
  result += String.fromCharCode(Math.floor(Math.random()*26)+97) || String.fromCharCode(Math.floor(Math.random()*26)+65)
  result += String.fromCharCode(Math.floor(Math.random()*26)+65) || String.fromCharCode(Math.floor(Math.random()*26)+97)
  result += String.fromCharCode(Math.floor(Math.random()*9)+49)
  return result
}

router.post('/urls', (req, res,next) => {
  let input_url = req.body.input_url
  if(input_url === ''){
    res.render('index', {title: 'Shorten URL', error: "Input must be filled"})
  }else{
    Urls.beforeCreate(((url) => {
      url.short_url = random_url()
      return sequelize.Promise.resolve(url)
    }))

    Urls.create({
      urls: input_url
    }).then((data) => {
      console.log(`Insert Data Success`);
      console.log(data.short_url)
      res.redirect(`/${data.short_url}`)
    }).catch((err) => {
      res.render('index', {title: 'Shorten URL', error: "Input must link"})
    })
  }
})

router.get('/:short_urls', (req, res, next) => {
  res.redirect('/')
})

module.exports = router;
