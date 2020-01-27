window.onload = function () {
    $('#submit').click(function (event) {
        event.preventDefault();
        $.post('/', { city: $('#city').val() }, function (res) {
            console.log(res);
            if (!res.cod) {
                publish('Sorry, there is no connection.')
                return;
            }
            if (res.message !== 0) {
                publish(`Sorry, ${res.message}.`);
                return;
            }
            publish(res.city.name);
            let data = collectData(getForecastDays(), res.list);
            console.log(data);
        });
    });
}

const publish = (message) => {
    $('#weather').html(message);
}

/* Constants */
const FORECAST_DAYS = 5;

const getForecastDays = () => {
    var today = new Date().getUTCDay();
    let result = [];
    for (let i = 0; i < FORECAST_DAYS; i++) {
        result.push(today + i);
    }
    return result;
}

const collectData = (days, list) => {
    let day = 0;
    let first = true;
    for (const element of list) {
        if (days >= days.length) {
            break;
        }
        if (new Date().getHours() !== 12 && !first) {
            continue;
        }
        first = false;
        days[day].temp = formatTemperature(element.main.temp);
        days[day].icon = element.weather[0].icon;
        console.log(`days[0].temp = ${days[day].temp}`)
        days++;
    }
    return days;
}

/* Constants */
const KELVIN_TO_CELSIUS = 273.15;

const formatTemperature = (kelvins) => {
    return Math.round(kelvins - KELVIN_TO_CELSIUS);
}