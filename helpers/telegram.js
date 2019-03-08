const {getEarthquakes} = require('../lib/earthquakes'),
    extra = require('telegraf/extra'),
    markup = extra.markdown(),
    {uvNow, uvForecast, weather} = require('../lib/air'),
    {globalStatus} = require('../lib/global'),
    {getNews} = require('../lib/news'),
    {cameraUrl} = require('../lib/cameras'),
    {satelliteMap, politicalMap} = require('../lib/maps'),
    {isoDateConverter, unixTimestampToDate} = require('../lib/utilities');

    function manageWeather (data, ctx) {


        function weatherDetails(currentWeather){        
            const msg = `
    *${currentWeather.weather[0].description}*
    _${unixTimestampToDate(currentWeather.dt)}_
    🔹 Temp: ${currentWeather.main.temp}°C
    🔹 Temp Min: ${currentWeather.main.temp_min}°C
    🔹 Temp Max: ${currentWeather.main.temp_max}°C
    🔹 Presión: ${currentWeather.main.pressure}
    🔹 Humedad: ${currentWeather.main.humidity}%
    🔹 Viento: ${currentWeather.wind.deg}° ${currentWeather.wind.speed}km/h`;
    
            ctx.reply(msg, markup);
        }
    
        if(Array.isArray(data)){
            data.forEach(weatherDetails);
        } else {
            weatherDetails(data);
        }
    }


function manageEartquakes (data, ctx) {
    data.forEach(item => {
        const msg = `
  *${item.properties.title}*
  _${new Date(item.properties.time).toLocaleString("es-ES")}_
  ⚠️  Magnitude: ${item.properties.mag}
  👉  More info: ${item.properties.url}`;
          ctx.reply(msg, markup);
      });
}

function manageNews (articles, ctx){
    articles.forEach(article => {
        const msg = `
        *${article.title} by ${article.source.name}*
        _${article.description}_
        👉  [Read more...](${article.url})`;
        ctx.reply(msg, markup);
    });
}

function manageGlobal (data, ctx) {
    function getDetails (items){
        return items
            .map(item => `- ${item.name}`)
            .join("\n");
    }
    
    data.forEach(item => {
        const msg = `
        *${item.name}*
_${getDetails(item.data) || "Nothing to report! 💪"}_`;
        ctx.reply(msg, markup);
    });
}

function manageUv (data, ctx) {
    if(Array.isArray(data)){
        data.forEach(item => {
            ctx.reply(`☀ ${item.value} at ${isoDateConverter(item.date_iso)}`, markup);
        });
    } else {
        ctx.reply(`☀ ${data.value}`, markup);
    }
}

exports.sendEarthquakes = ctx => {
    getEarthquakes("all", "hour")
        .then(data => manageEartquakes(data, ctx))
        .catch(ctx.reply);
};

exports.sendNews = ctx => {
    getNews()
        .then(data => manageNews(data, ctx))
        .catch(ctx.reply);
};

exports.sendGlobal = ctx => {
    globalStatus()
        .then(data => manageGlobal(data, ctx))
        .catch(ctx.reply);
};

exports.sendUvNow = ctx => {
    uvNow()
        .then(data => manageUv(data, ctx))
        .catch(ctx.reply);
};

exports.sendUvForecast = ctx => {
    uvForecast()
        .then(data => manageUv(data, ctx))
        .catch(ctx.reply);   
};

exports.sendWeatherNow = ctx => {
    weather()
        .then(data => manageWeather(data.list[0], ctx))
        .catch(ctx.reply);
};


exports.sendWeatherForecast = ctx => {
    weather()
        .then(data => manageWeather(data.list, ctx))
        .catch(ctx.reply); 
};

exports.sendCamera = ctx => ctx.replyWithPhoto({ url: cameraUrl() });
exports.sendMapSatellite = ctx => ctx.replyWithPhoto({ url: satelliteMap() });
exports.sendMapContext = ctx => ctx.replyWithPhoto({ url: politicalMap() });