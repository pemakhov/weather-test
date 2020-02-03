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
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${req.body.city}&APPID=`)
    .then(res => res.json())
    .then(json => res.send(json));
});

/* POST weather table. */
router.post('/data', function (req, res) {
	const data = JSON.parse(req.body.cityData);
  res.render('weather-table', {cityData: data});
});

module.exports = router;

