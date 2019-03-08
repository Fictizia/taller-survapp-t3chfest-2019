const got = require('got');
const {tokens, defaults} = require('../config');

function getData (url) {
    return new Promise((resolve, reject) => {
        got(url)
            .then(res => resolve(JSON.parse(res.body)))
            .catch(error => reject(error.response.body));
    });
}

exports.uvNow = (lat=defaults.lat, lon=defaults.lon) => getData(`https://api.openweathermap.org/data/2.5/uvi?lang=es&lat=${lat}&lon=${lon}&appid=${tokens.owm}`);
exports.uvForecast = (lat=defaults.lat, lon=defaults.lon) => getData(`https://api.openweathermap.org/data/2.5/uvi/forecast?lang=es&lat=${lat}&lon=${lon}&appid=${tokens.owm}`);
exports.weather = (lat=defaults.lat, lon=defaults.lon) => getData(`http://api.openweathermap.org/data/2.5/find?lang=es&lat=${lat}&lon=${lon}&units=metric&appid=${tokens.owm}`);
exports.weatherForecast = (lat=defaults.lat, lon=defaults.lon) => getData(`http://api.openweathermap.org/data/2.5/forecast/daily?lang=es&lat=${lat}&lon=${lon}&units=metric&appid=${tokens.owm}`);
