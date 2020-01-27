exports.getWeekDays = () => {
    var date = new Date();
//   let result = [];
//   for (let i = 0; i < FORECAST_DAYS; i++) {
//     result.push(today + i);
//   }
return date.getUTCDay();
}

exports.sayHello = () => {
  return 'hello';
}

exports.addTemperatures = (src) => {

}