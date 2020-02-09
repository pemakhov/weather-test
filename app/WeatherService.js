const fetch = require('node-fetch');
const API_KEY = require('../apiconfig');

exports.getWeather = async (city) => {
  const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}`;
  const json = await fetch(encodeURI(URL)).then((data) => data.json());
  return json;
};

exports.prepareData = (src) => {
  const FORECAST_TIME = 14;
  const FORECAST_DAYS = 5;

  const isForecastTime = (item) => {
    const date = new Date(item.dt * 1000);
    return date.getHours() === FORECAST_TIME;
  };

  const getFirstForecast = (item) => {
    const date = new Date(item.dt * 1000);
    if (date.getHours() > FORECAST_TIME) {
      return item;
    }
    return null;
  };

  const collectData = (item) => {
    /* Transfer Kelvins in Celsius and then round */
    const formatTemperature = (kelvins) => {
      const KELVIN_TO_CELSIUS = 273.15;
      return Math.round(kelvins - KELVIN_TO_CELSIUS);
    };

    /* Returns the day name corresponding to its number */
    const getDayName = (dayNumber) => {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return dayNames[dayNumber];
    };

    const result = {};
    const date = new Date(item.dt * 1000);
    result.day = getDayName(date.getDay());
    result.time = `${date.getHours()}:00`;
    result.temp = formatTemperature(item.main.temp);
    result.description = item.weather[0].description;
    result.icon = item.weather[0].icon;

    return result;
  };

  let forecastData = src.list.filter(isForecastTime);

  const firstForecast = getFirstForecast(src.list[0]);
  if (firstForecast !== null) {
    forecastData.unshift(firstForecast);
  }

  forecastData = forecastData.slice(0, FORECAST_DAYS);
  forecastData = forecastData.map(collectData);

  return { data: forecastData, city: src.city.name };
};
