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
            let data = collectData(res.list);
			console.log(data);
			$.post('/data', data, function (res) {
				publish(res);
            });
        });
    });
}

const publish = (message) => {
    $('#weather').html(message);
}

const collectData = (list) => {
	let data = [];
	data = setDaysOfWeek(data);
    let day = 0;
    let first = true;
	const nowHours = new Date().getHours();
    for (let element of list) {
        if (day >= data.length) {
            break;
        }
		if ((new Date(element.dt_txt).getHours() !== 12 && !first) || (nowHours < 12 && first)) {
            continue;
        }
        first = false;
        data[day].temp = formatTemperature(element.main.temp);
        data[day].icon = element.weather[0].icon;
        day++;
    }
    return data;
};

/* Constants */
const FORECAST_DAYS = 5;

const setDaysOfWeek = (data) => {
    var today = new Date().getUTCDay();
    for (let i = 0; i < FORECAST_DAYS; i++) {
        data.push({ day: getDayName(today + i) });
    }
    return data;
};

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

const formatTemperature = (kelvins) => {
    return Math.round(kelvins - KELVIN_TO_CELSIUS);
};