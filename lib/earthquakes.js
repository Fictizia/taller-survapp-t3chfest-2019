const got = require('got');

const timesChoices = ["hour", "day", "week", "month"];
const magsChoices = ['all', '1.0', '2.5', '4.5', 'significant'];

exports.getEarthquakes = (mag='significant', time="hour") => {
    return new Promise((resolve,reject) => {
        
        if(!magsChoices.includes(mag) || !timesChoices.includes(time)){
            reject("bad choice my friend!");
        }
        
        got(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${mag}_${time}.geojson`)
            .then(res => resolve(JSON.parse(res.body).features))
            .catch(error => reject(error.response.body));
    });
};