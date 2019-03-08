const Telegraf = require('telegraf'),
    extra = require('telegraf/extra'),
    markup = extra.markdown(),
    {tokens} = require('./config'),
    {getEarthquakes} = require('./lib/earthquakes');

const bot = new Telegraf(tokens.telegram);

function sendEarthquakes(data, ctx){    
    data.forEach(item => {
      const msg = `
*${item.properties.title}*
_${new Date(item.properties.time).toLocaleString("es-ES")}_
⚠️  Magnitude: ${item.properties.mag}
👉  More info: ${item.properties.url}`;
        ctx.reply(msg, markup);
    });
}

bot.start((ctx) => ctx.reply('Hello my friend!!'));
bot.help((ctx) => ctx.reply('/earthquakes'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.command('earthquakes', ctx => {
    getEarthquakes("all", "hour")
        .then(data => sendEarthquakes(data, ctx))
        .catch(ctx.reply);
});

bot.launch();