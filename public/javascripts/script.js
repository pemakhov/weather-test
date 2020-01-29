window.onload = function () {
    $('#submit').click(function (event) {
        event.preventDefault();
        $cityInput = $('#city');
        /* Exit, if input is empty */
        if ($cityInput.val() === '') {
            return;
        }
        /* Current input */
        const cityInput = $('#city').val();
        /* Clear text input */
        $('#city').val('');
        $.post('/', { city: cityInput }, function (res) {
            /* Check existance of the field that seems to be in each object */
            if (!res.cod) {
                publish('Sorry, there is no connection', $('#message'));
                publish('', $('#weather'))
                return;
            }
            /* If this field equals 0, there is no error */
            if (res.message !== 0) {
                publish(`Sorry, ${res.message}`, $('#message'));
                publish('', $('#weather'))
                return;
            }
            publish(`Weather in ${res.city.name}`, $('#message'));
            /* Send only needed data and receive html-code of weather table */
            $.post('/data', { cityData: JSON.stringify(collectData(res.list)) }, function (res) {
                publish(res, $('#weather'))
            });
        });
    });
}

/* Inserts content 'what' into a block 'where' */
const publish = (what, where) => {
    $(where).html(what);
}

/* Collects only needed data from the api's object */
const collectData = (list) => {
	console.log(list);

    let data = [];
    data = setDaysOfWeek(data);
    let day = 0;
    let first = true;
    const nowHours = new Date().getHours();
	let i = -1;
    for (let element of list) {
        if (day >= data.length) {
            break;
        }
        /* Collect data for 12:00, or the first data for the current day, if it is past 12:00 */
		const forecastHours = new Date(element.dt_txt).getHours();
        if ((forecastHours !== 12 && !first) || (nowHours < 12 && first && forecastHours !== 12)) {
            continue;
        }
        first = false;
        data[day].temp = formatTemperature(element.main.temp);
        data[day].icon = element.weather[0].icon;
        day++;
    }
	console.log(data);
    return data;
};

/* Constants */
const FORECAST_DAYS = 5;
const DAYS_IN_WEEK = 7;

/* Sets week day names for forecast days */
const setDaysOfWeek = (data) => {
    var today = new Date().getUTCDay();
    for (let i = 0; i < FORECAST_DAYS; i++) {
        data.push({ day: getDayName((today + i) % DAYS_IN_WEEK) });
    }
    return data;
};

/* Returns the day name corresponding to its number */
const getDayName = (dayNumber) => {
    const weekDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    return weekDayNames[dayNumber];
};

/* Constants */
const KELVIN_TO_CELSIUS = 273.15;

/* Transfer Kelvins in Celsius and then round */
const formatTemperature = (kelvins) => {
    return Math.round(kelvins - KELVIN_TO_CELSIUS);
};