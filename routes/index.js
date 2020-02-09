const express = require('express');
const WeatherService = require('../app/WeatherService');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/weather', (req, res) => {
  try {
    const { city } = req.query;

    if (!city || city.length === 0) {
      return res.status(400).render('error', { message: 'Bad request' });
    }

    WeatherService.getWeather(city)
      .then((json) => {
        if (parseInt(json.cod, 10) === 404) {
          return res.status(404).render('error', { message: 'City not found' });
        }

        const forecast = WeatherService.prepareData(json);
        return res.status(200).render('forecast', { data: forecast.data, message: `Weather in ${forecast.city}` });
      });
  } catch (err) {
    res.status(500).render('error', { message: err.message });
  }
  return false;
});

module.exports = router;
