"use strict"

var express = require('express');
var router = express.Router();
let models = require('../models')
let Urls = models.Url
let sequelize = require('sequelize')

/* GET home page. */
router.get('/', function(req, res, next) {
  Urls.findAll().then((data) => {
    res.render('index', { title: 'Shortener URL', database: data});
  })
  // res.render('index', { title: 'Shorten URL'})
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
  let input_url = req.body.input_url.toLowerCase()

  if(input_url === ''){
    // res.render('index', {title: 'Shorten URL', error: "Input must be filled"})
    Urls.findAll().then((all_data) => {
      res.render('index', { title: 'Shortener URL', error: "Input must be filled", database: all_data});
    })
  }else{
    Urls.beforeCreate(((url) => {
      url.short_url = random_url()
      return sequelize.Promise.resolve(url)
    }))


    Urls.findOne({
      where: {
        urls: input_url
      }
    }).then((data) => {
      res.render('index', {title: 'Shortener URL', find_short_url: data.short_url})
      // Urls.findAll().then((all_data) => {
      //   console.log(data.short_url);
      //   res.render('index', { title: 'Shortener URL', find_short_url: data.short_url, database: all_data});
      // })
    }).catch(()=> {
        Urls.create({
          count: 0,
          urls: input_url
        }).then((new_data) => {
          console.log(`Insert Data Success`);
          console.log(new_data.short_url)
          res.redirect(`/`)
        }).catch((err) => {
          console.log(`not link`);
          Urls.findAll().then((all_data) => {
            res.render('index', { title: 'Shortener URL', error: "Input must link", database: all_data});
          })
          // res.render('index', {title: 'Shortener URL', error: "Input must link"})
          // res.redirect('/')
        })
    })

  }
})

router.get('/:short_urls', (req, res, next) => {
  console.log(req.params.short_urls);
  if(typeof req.params.short_urls != 'undefined'){
    Urls.findOne({
      where: {
        short_url: req.params.short_urls
      }
    }).then((data) => {
      console.log(data.count);
      data.count++
      Urls.update({
        count: data.count
      },{
        where: {
          id: data.id
        }
      }).then((data_update) => {
        // console.log(data_update);
      })
      res.redirect(`http://${data.urls}`)
    })
  }
})

module.exports = router;
