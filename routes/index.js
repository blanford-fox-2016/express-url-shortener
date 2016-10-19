var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'URL Shortener' });
});

router.post('/urls', (req, res) =>{
  var url = req.body.url
  console.log(url);
  res.render('index', { title: 'URL Shortener', url });
});

router.get('/:short_url', (req, res, next) => {

});

module.exports = router;
