var express = require('express');
var router = express.Router();
let models = require('../models')
let Urls = models.Url

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shorten URL' });
});

let random_url = () => {
  let result = 'short.id/'
  result += String.fromCharCode(Math.floor(Math.random()*9)+49)
  result += String.fromCharCode(Math.floor(Math.random()*26)+97) || String.fromCharCode(Math.floor(Math.random()*26)+65)
  result += String.fromCharCode(Math.floor(Math.random()*26)+65) || String.fromCharCode(Math.floor(Math.random()*26)+97)
  result += String.fromCharCode(Math.floor(Math.random()*9)+49)
  return result
}

router.post('/urls', (req, res,next) => {
  // console.log(req.body.input_url);
  // console.log(random_url());
  let input_url = req.body.input_url
  // console.log(/.([a-zA-Z]{2,3})$/.test(input_url));
  //else if(/.com$/.test(input_url) === false){
  //   res.render('index', {title: 'Shorten URL', error: "Input must link"})
  // }
  if(input_url === ''){
    res.render('index', {title: 'Shorten URL', error: "Input must be filled"})
  }else{
    Urls.create({
      urls: input_url,
      short_url: random_url(),
    }).then(() => {
      console.log(`Insert Data Success`);

      res.redirect('/')
    }).catch((err) => {
      res.render('index', {title: 'Shorten URL', error: "Input must link"})
    })
  }
})

router.get('/:short_urls', (req, res, next) => {

})

module.exports = router;
