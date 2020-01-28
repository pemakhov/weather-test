var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var forecast = require('../app/forecast');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* Get forecast data. */
router.post('/', function (req, res) {
  if (!req.body.city) {
    return;
  }
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${req.body.city}&APPID=d8db4200188415907b23cd38e4763112`)
    .then(res => res.json())
    .then(json => res.send(json));
});

/* POST weather table. */
router.post('/data', function (req, res) {
	const data = req.body;
	console.log(data);
  res.render('weather-table', {});
});


module.exports = router;

