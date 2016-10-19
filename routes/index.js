var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shorten URL' });
});

router.post('/urls', (req, res,next) => {
  
})

router.get('/:short_urls', (req, res, next) => {

})

module.exports = router;
