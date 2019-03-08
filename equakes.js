const {getEarthquakes} = require("./lib/earthquakes.js")

getEarthquakes("all", "hour")
    .then(console.log)
    .catch(console.log);