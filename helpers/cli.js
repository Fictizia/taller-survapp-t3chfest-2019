const {getEarthquakes} = require('../lib/earthquakes'), 
    {getNews} = require('../lib/news'), 
    {globalStatus} = require('../lib/global'), 
    {uvNow, uvForecast, weather} = require('../lib/air'), 
    {isoDateConverter, unixTimestampToDate} = require('../lib/utilities'),
    terminalImage = require('terminal-image'), 
    {satelliteMap, politicalMap} = require('../lib/maps'), 
    {cameraUrl} = require('../lib/cameras'),
    got = require('got'),
    vorpal = require('vorpal')(),
    chalk = vorpal.chalk;

function printWeather(data) {

    function weatherDetails(currentWeather) {
        return `
${chalk.white.bgRed(currentWeather.weather[0].description)}
${chalk.red(unixTimestampToDate(currentWeather.dt))}
🔹 Temp: ${currentWeather.main.temp}°C
🔹 Temp Min: ${currentWeather.main.temp_min}°C
🔹 Temp Max: ${currentWeather.main.temp_max}°C
🔹 Presión: ${currentWeather.main.pressure}
🔹 Humedad: ${currentWeather.main.humidity}%
🔹 Viento: ${currentWeather.wind.deg}° ${currentWeather.wind.speed}km/h`;
    }

    if (Array.isArray(data)) {
        return data.map(weatherDetails).join('\n');
    } else {
        return weatherDetails(data);
    }
}


function printUv(data) {
    if (Array.isArray(data)) {
        return data.map(item => `- ☀ ${item.value} at ${isoDateConverter(item.date_iso)}`).join('\n');
    } else {
        return `☀ ${data.value}`;
    }
}

function printGlobal(data) {
    function getDetails(items) {
        return items
            .map(item => `- ${item.name}`)
            .join("\n");
    }

    return data.map(item => {
        return `
${chalk.white.bgRed(item.name)}
${getDetails(item.data) || "Nothing to report! 💪"}`;
    }).join('\n');
}


const earthquakes = {
    questions: [{
            type: 'list',
            name: 'period',
            choices: [{
                    "name": "Last hour",
                    "value": "hour"
                },
                {
                    "name": "Last day",
                    "value": "day"
                },
                {
                    "name": "Last 7 days",
                    "value": "week"
                },
                {
                    "name": "Last 30 days",
                    "value": "month"
                }
            ],
            message: 'Which Period?'
        },

        {
            type: 'list',
            name: 'magnitude',
            choices: [{
                    "name": "All earthquakes",
                    "value": "all"
                },
                {
                    "name": "Just earthquakes +M1.0",
                    "value": "1.0"
                },
                {
                    "name": "Just earthquakes +M2.5",
                    "value": "2.5"
                },
                {
                    "name": "Just earthquakes +M4.0",
                    "value": "4.5"
                },
                {
                    "name": "Just significative earthquakes",
                    "value": "significant"
                }
            ],
            message: 'What magnitude?'
        }
    ],
    response(data) {
        return data.map(item => {
            return `
${chalk.white.bgRed(item.properties.title)}
${chalk.italic(new Date(item.properties.time).toLocaleString("es-ES"))}
${chalk.bold("⚠️  Magnitude:")} ${item.properties.mag}
${chalk.bold("🌎  Place:")} ${item.properties.place} (${item.geometry.coordinates[0]} , ${ item.geometry.coordinates[1]})
${chalk.bold("🗺️  Geojson")} ${item.properties.detail}
${chalk.bold("👉  More info")} ${item.properties.url}\n`;
        }).join('\n');
    }
};

const news = {
    questions: [{
        type: 'input',
        name: 'topic',
        message: 'what topic do you want?',
        default: 'emergency'
    }, {
        type: "input",
        name: "quantity",
        message: "How many do you want?",
        validate: (value) => {
            var valid = !isNaN(parseInt(value, 10));
            return valid || "Please enter a number";
        },
        filter: Number
    }],
    response(articles) {
        return articles.map(article => {
            return `
${chalk.white.bgRed(article.title)}
by ${article.source.name}

${article.description}

👉  ${article.url}`;
        }).join('\n');
    }
};

exports.manageEarthquakes = function(args, cb) {
    this.prompt(earthquakes.questions, result => {
        getEarthquakes(result.magnitude, result.period)
            .then(data => {
                this.log(earthquakes.response(data));
            })
            .catch(this.log)
            .finally(cb);
    });
};

exports.manageNews = function(args, cb) {
    this.prompt(news.questions, result => {
        getNews({
                q: result.topic,
                pageSize: result.quantity
            })
            .then(data => {
                this.log(news.response(data));
            })
            .catch(this.log)
            .finally(cb);
    });
};

exports.manageGlobal = async function(args, cb) {
    this.log("This query can take several seconds...");
    try {
        const data = await globalStatus();
        this.log(printGlobal(data));
    } catch (err) {
        this.log(err);
    }
    cb();
};

exports.manageUvNow = async function(args, cb) {
    try {
        const data = await uvNow();
        this.log(printUv(data));
    } catch (err) {
        this.log(err);
    }
    cb();
};

exports.manageUvForecast = async function(args, cb) {
    try {
        const data = await uvForecast();
        this.log(printUv(data));
    } catch (err) {
        this.log(err);
    }
    cb();
};

exports.manageWeatherNow = async function(args, cb) {
    try {
        const data = await weather();
        this.log(printWeather(data.list[0]));
    } catch (err) {
        this.log(err);
    }
    cb();
};

exports.manageWeatherForecast = async function(args, cb) {
    try {
        const data = await weather();
        this.log(printWeather(data.list));
    } catch (err) {
        this.log(err);
    }
    cb();
};


exports.manageCamera = async function(args, cb) {
    try {
        const {
            body
        } = await got(cameraUrl(), {
            encoding: null
        });
        this.log(await terminalImage.buffer(body));
    } catch (err) {
        this.log(err);
    }
    cb();
};

exports.manageMapSatellite = async function(args, cb) {
    try {
        const {
            body
        } = await got(satelliteMap(), {
            encoding: null
        });
        this.log(await terminalImage.buffer(body));
    } catch (err) {
        this.log(err);
    }
    cb();
};

exports.manageMapContext = async function(args, cb) {
    try {
        const {
            body
        } = await got(politicalMap(), {
            encoding: null
        });
        this.log(await terminalImage.buffer(body));
    } catch (err) {
        this.log(err);
    }
    cb();
};


exports.asciiLogo = () => {
    return `
    /$$$$$$                                  /$$$$$$                     
    /$$__  $$                                /$$__  $$                    
   | $$  \__/ /$$   /$$  /$$$$$$  /$$    /$$| $$  \ $$  /$$$$$$   /$$$$$$ 
   |  $$$$$$ | $$  | $$ /$$__  $$|  $$  /$$/| $$$$$$$$ /$$__  $$ /$$__  $$
    \____  $$| $$  | $$| $$  \__/ \  $$/$$/ | $$__  $$| $$  \ $$| $$  \ $$
    /$$  \ $$| $$  | $$| $$        \  $$$/  | $$  | $$| $$  | $$| $$  | $$
   |  $$$$$$/|  $$$$$$/| $$         \  $/   | $$  | $$| $$$$$$$/| $$$$$$$/
    \______/  \______/ |__/          \_/    |__/  |__/| $$____/ | $$____/ 
                                                      | $$      | $$      
                                                      | $$      | $$      
                                                      |__/      |__/      `;
};