
const express = require('express');
const fetch = require('node-fetch');
const API_KEY = require('../apiconfig');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

/* Get forecast data. */
router.post('/', (req, res) => {
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${req.body.city}&APPID=${API_KEY}`)
    .then((data) => data.json())
    .then((json) => res.send(json));
});

/* POST weather table. */
router.post('/data', (req, res) => {
  const data = JSON.parse(req.body.cityData);
  res.render('weather-table', { cityData: data });
});

module.exports = router;
