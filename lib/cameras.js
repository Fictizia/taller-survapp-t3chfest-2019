const got = require('got'),
    cameras = require('../data/cameras.json'),
    {randomItemInList, writeFileAsync, readFileAsync, timestamp} = require('./utilities'),
    {paths} = require('../config');


// @see: https://datos.madrid.es/portal/site/egob/menuitem.c05c1f754a33a9fbe4b2e4b284f1a5a0/?vgnextoid=8803c23866b93410VgnVCM1000000b205a0aRCRD&vgnextchannel=374512b9ace9f310VgnVCM100000171f5a0aRCRD&vgnextfmt=default
function cameraUrl (id) {
  if(id === undefined){
      id = randomItemInList(cameras).number;
  }
  return "http://informo.munimadrid.es/cameras/Camara"+id+".jpg";
}

function cameraImage (id, path) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await got(cameraUrl(id), {encoding: null});
            const buffer = Buffer.from(res.body);
            resolve(path ? await writeFileAsync(path, buffer, 'utf8') : buffer);
        } catch (err) {
            reject(err);
        }
    });

}


async function updateData () {
    const response = await got('https://datos.madrid.es/egob/catalogo/202088-0-trafico-camaras.kml');
    const data = response.body;
    await writeFileAsync(`${paths.data}/cameras.kml`, data);
    const regex = /<Value>(.*)<\/Value>/gm;
    let m;
    var final_data = [];
    var pointer = 0;
    while ((m = regex.exec(data)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
    
        for(let i = 1, control = 0; i < m.length; control++, i += 2){
            const value = m[i];
            final_data[pointer] = final_data[pointer] || {};
            if(value.length === 5){
                final_data[pointer].number = value;
                final_data[pointer].url = `http://informo.munimadrid.es/cameras/Camara${value}.jpg`;
            } else {
                final_data[pointer].name = value;
                pointer++;
            }
        }
    }    
    await writeFileAsync(`${paths.data}/cameras.json`, JSON.stringify(final_data));
}

module.exports = {updateData, cameraImage, cameraUrl};
