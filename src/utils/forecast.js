const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const urlWeather =
        'https://api.darksky.net/forecast/baeaaa1bf7f592e4d2563a4751f4762e/' +
        encodeURIComponent(latitude) +
        ',' +
        encodeURIComponent(longitude) +
        '?units=si&lang=fr';

    request({ url: urlWeather, json: true }, (error, response) => {
        if (error) {
            callback({
                error: 'We got a problem with your internet connection'
            });
        } else if (response.body.error) {
            callback({
                error: 'Unable to connect to the API '
            });
        } else {
            /*const data = {
                summary: response.body.daily.data[0].summary,
                precipProbability: response.body.currently.precipProbability,
                temperature: response.body.currently.temperature
            };*/
            const forecastMsg =
                response.body.daily.data[0].summary +
                ' Il fait ' +
                response.body.currently.temperature +
                '°C ' +
                "et la chance qu'il pleuve est de " +
                response.body.currently.precipProbability +
                '% ';
            response.body.currently.temperature;
            console.log(urlWeather);
            callback(undefined, forecastMsg);
        }
    });
};

module.exports = forecast;
