var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var forecast = require('../app/forecast');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* POST weather table. */
router.post('/', function (req, res) {
  if (!req.body.city) {
    return;
  }
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${req.body.city}&APPID=d8db4200188415907b23cd38e4763112`)
    .then(res => res.json())
    .then(json => res.send(json));

  // res.render('weather-table', { city: req.body.city });
});


module.exports = router;
