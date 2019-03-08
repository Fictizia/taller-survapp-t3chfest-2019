const {tokens} = require('../config'),
    {niceDate} = require('./utilities'),
    got = require('got');

exports.getNews = (req={}) => {
    const q = req.q || "emergency";
    const pageSize = req.pageSize || 10;
    const from = req.from || niceDate();
    const to = req.to || niceDate();
    const sortBy = req.sortBy || "popularity";

    const url = `https://newsapi.org/v2/everything?q=${q}&pageSize=${pageSize}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=${tokens.news}`;
    return new Promise((resolve, reject) => {
        got(url)
        .then(res => resolve(JSON.parse(res.body).articles))
        .catch(reject);
    });
};
