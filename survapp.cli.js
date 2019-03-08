const vorpal = require('vorpal')(),
  chalk = vorpal.chalk,
  {manageEarthquakes, manageNews, manageGlobal, manageUvNow, manageUvForecast, manageWeatherNow, manageWeatherForecast, manageCamera, manageMapSatellite, manageMapContext, asciiLogo} = require('./helpers/cli');


console.log(chalk.red(asciiLogo()));

vorpal
  .command('earthquakes', 'display Earthqueakes in the world')
  .action(function (args, cb) {
    manageEarthquakes.apply(this, [args, cb]);
  });

vorpal
  .command('news', 'Display latest news about any topic choosen')
  .action(function (args, cb) {
    manageNews.apply(this, [args, cb]);
  });

vorpal
  .command('global', 'Display info about emergency situations all around the globe')
  .action(function (args, cb) {
    manageGlobal.apply(this, [args, cb]);
  });

vorpal
  .command('uv now', 'Display current UV in the area')
  .action(function (args, cb) {
    manageUvNow.apply(this, [args, cb]);
  });

vorpal
  .command('uv forecast', 'Display forecast UV in the area')
  .action(function (args, cb) {
    manageUvForecast.apply(this, [args, cb]);
  });

vorpal
  .command('weather now', 'Display currente weather in the area.')
  .action(function (args, cb) {
    manageWeatherNow.apply(this, [args, cb]);
  });

vorpal
  .command('weather forecast', 'Display forecast weather in the area')
  .action(function (args, cb) {
    manageWeatherForecast.apply(this, [args, cb]);
  });

vorpal
  .command('map satellite', 'Render current position in satillete image')
  .action(function (args, cb) {
    manageMapSatellite.apply(this, [args, cb]);
  });

vorpal
  .command('map context', 'Render current position in satillete image with extra info')
  .action(function (args, cb) {
    manageMapContext.apply(this, [args, cb]);
  });

vorpal
  .command('camera', 'Render random traffic camera image')
  .action(function (args, cb) {
    manageCamera.apply(this, [args, cb]);
  });


vorpal
  .delimiter(chalk.white.bgRed('SurvAPP$'))
  .show();