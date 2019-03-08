const Telegraf = require('telegraf'),
    extra = require('telegraf/extra'),
    markup = extra.markdown(),
    {tokens} = require('./config'),
    {sendCamera, sendMapSatellite, sendMapContext, sendWeatherNow, sendWeatherForecast, sendUvNow, sendUvForecast, sendGlobal, sendNews, sendEarthquakes } = require('./helpers/telegram');

const bot = new Telegraf(tokens.telegram);

const helpMenu = Telegraf.Extra
  .markdown()
  .markup((m) => m.keyboard([
    m.callbackButton('/camera'),
    m.callbackButton('/map_satellite'),
    m.callbackButton('/map_context'),
    m.callbackButton('/news'),
    m.callbackButton('/global'),
    m.callbackButton('/uv_now'),
    m.callbackButton('/uv_forecast'),
    m.callbackButton('/weather_now'),
    m.callbackButton('/weather_forecast'),
    m.callbackButton('/earthquakes')
  ]).resize());

bot.start((ctx) => ctx.reply('Hello my friend!\n This is *SurvAPP* 💪', markup));
bot.help(ctx => ctx.reply('help', helpMenu));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.command('camera', sendCamera);
bot.command('map_satellite', sendMapSatellite);
bot.command('map_context', sendMapContext);
bot.command('news', sendNews);
bot.command('global', sendGlobal);
bot.command('uv_now', sendUvNow);
bot.command('uv_forecast', sendUvForecast);
bot.command('weather_now', sendWeatherNow);
bot.command('weather_forecast', sendWeatherForecast);
bot.command('earthquakes', sendEarthquakes);
bot.launch();