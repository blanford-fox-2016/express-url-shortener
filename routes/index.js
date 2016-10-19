let express = require('express');
let router = express.Router();
let models = require('../models');
let shortlink = models.shortlink;
let randomchar = "";

let getAngka = () => {
  randomchar += String.fromCharCode(Math.round(Math.random()*9)+48);
}

let getUpper = () => {
  randomchar += String.fromCharCode(Math.round(Math.random()*25)+65);
}

let getLower = () => {
  randomchar += String.fromCharCode(Math.round(Math.random()*25)+97);
}

let chooseNumLet = () => {
  for (var i = 0; i < 5; i++) {
    if(Math.round(Math.random()*3) == 1) {
      getAngka();
    } else if(Math.round(Math.random()*3) == 2){
      getUpper();
    } else {
      getLower();
    }
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  shortlink.findAll().then((data, err) => {
    // res.send(data)
    res.render('index', { data });
  })
});

router.post('/', (req, res, next) => {
  randomchar = ""
  let orilink = req.body.orilink;
  chooseNumLet();

  shortlink.create({
    originallink: orilink,
    shortlink: randomchar,
    visitedtimes: 0
  }).then((data, err) => {
    if (err) {
      res.send(err);
    } else {
      shortlink.findAll().then((data, err) => {
        res.render('index', { data });
      })
    }
  })
});

router.get('/:shortlink', (req, res, next) => {
  shortlink.findOne({
    where: {
      shortlink: req.params.shortlink
    }
  }).then((data, err) => {
    if (err) {
      console.log(err);
    } else {
      // res.send(data.shortlink)
      res.redirect(data.originallink)
      shortlink.update({
        visitedtimes: data.visitedtimes + 1
      }, {
        where: {
          shortlink: data.shortlink
        }
      }).then((data,err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect(data.originallink);
        }
      })
    }
  });
});

module.exports = router;
