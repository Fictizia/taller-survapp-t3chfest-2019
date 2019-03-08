const {tokens, defaults} = require('../config');

function generateImgUrl (opt){
  const token = tokens.googleMaps;
  const mapTypes = ["roadmap", "satellite", "hybrid", "terrain"];
  const lat = opt.lat || defaults.lat;
  const lon = opt.lon || defaults.lon;
  const size = opt.size || "400x600";
  const zoom = opt.zoom || "18";
  const marker = opt.marker || false;
  let maptype = opt.maptype || "roadmap";

  if(!mapTypes.includes(opt.maptype)){
    opt.maptype = "roadmap"
  }
  let url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&size=${size}&maptype=${maptype}&key=${token}`;
  
  if (marker) {
    url += `&markers=color:red%7C${lat},${lon}`;
  }

  return url.trim() 
}

exports.satelliteMap = (lat, lon) => generateImgUrl({lat, lon, maptype:"satellite"})
exports.politicalMap = (lat, lon) => generateImgUrl({lat, lon, maptype:"hybrid", zoom:"19", marker: true})
