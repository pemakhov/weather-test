var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST weather table. */
router.post('/', function(req, res) {
  request(`http://api.openweathermap.org/data/2.5/forecast?q=${req.body.city}&APPID=d8db4200188415907b23cd38e4763112`, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    res.send(body);
  });
  // let data = fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${req.body.city}&APPID=d8db4200188415907b23cd38e4763112`)
  //   .then((response) => {
  //     return response;
  // });
  // res.render('weather-table', { city: req.body.city });
});


module.exports = router;
