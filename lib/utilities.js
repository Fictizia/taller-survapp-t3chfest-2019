const {promisify} = require('util'),
    fs = require('fs');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

function isoDateConverter (isoDate)  {
    const date = new Date(isoDate);
    return `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
}

function unixTimestampToDate(timestamp){
    //@see: https://stackoverflow.com/a/847196
    let date = new Date(timestamp*1000);
    return date.toLocaleString("es-ES");
}

function niceDate (timestamp) {
    const d = timestamp ? new Date(timestamp) : new Date();
    return [d.getFullYear(), leftPad(d.getMonth()+1), leftPad(d.getDate())].join('-');
}

function leftPad (str, length=2, fill="0") {
    str = typeof(str) !== "string" ? str.toString() : str;
    return str.padStart(length, fill);
}

function randomItemInList (list) {
    return list[Math.floor(Math.random()*list.length)];
}

function timestamp () {
    return new Date().getTime();
}

module.exports = {niceDate, timestamp, randomItemInList, writeFileAsync, readFileAsync, leftPad, isoDateConverter, unixTimestampToDate};