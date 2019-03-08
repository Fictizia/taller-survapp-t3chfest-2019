
const vorpal = require('vorpal')(),
  {getEarthquakes} = require('./lib/earthquakes'),
  chalk = require('chalk');

function asciiLogo () {
  return `
  ███████╗ ██████╗ ██╗   ██╗ █████╗ ██╗  ██╗███████╗███████╗
  ██╔════╝██╔═══██╗██║   ██║██╔══██╗██║ ██╔╝██╔════╝██╔════╝
  █████╗  ██║   ██║██║   ██║███████║█████╔╝ █████╗  ███████╗
  ██╔══╝  ██║▄▄ ██║██║   ██║██╔══██║██╔═██╗ ██╔══╝  ╚════██║
  ███████╗╚██████╔╝╚██████╔╝██║  ██║██║  ██╗███████╗███████║
  ╚══════╝ ╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝`;
}


function showData(data){    
    data.forEach(item => {
      const msg = `
        ${chalk.black.bgCyan(item.properties.title)}
        ${chalk.italic(new Date(item.properties.time).toLocaleString("es-ES"))}
        ${chalk.bold("⚠️  Magnitude:")} ${item.properties.mag}
        ${chalk.bold("🌎  Place:")} ${item.properties.place} (${item.geometry.coordinates[0]} , ${ item.geometry.coordinates[1]})
        ${chalk.bold("🗺️  Geojson")} ${item.properties.detail}
        ${chalk.bold("👉  More info")} ${item.properties.url}\n`;
      console.log(msg);
    });
}


console.log(chalk.cyan(asciiLogo()));

vorpal
  .command('report')
  .action(function (args, cb) {
    this.prompt([
      {
        type: 'list',
        name: 'period',
        choices: [
          {"name": "Last hour", "value": "hour"},
          {"name": "Last day", "value": "day"},
          {"name": "Last 7 days", "value": "week"},
          {"name": "Last 30 days", "value": "month"}
          ],
        message: 'Which Period?'        
      },
      
      {
      type: 'list',
      name: 'magnitude',
      choices: [
        {"name": "All earthquakes", "value": "all"},
        {"name": "Just earthquakes +M1.0", "value": "1.0"},
        {"name": "Just earthquakes +M2.5", "value": "2.5"},
        {"name": "Just earthquakes +M4.0", "value": "4.5"},
        {"name": "Just significative earthquakes", "value": "significant"}
        ],
      message: 'What magnitude?'
    }], result => {
      getEarthquakes(result.magnitude, result.period)
        .then(data => this.log(showData(data)))
        .catch(this.log)
        .finally(cb);
    });
  });
         
vorpal
  .delimiter(chalk.bgCyan.white('EQuakes$'))
  .show();