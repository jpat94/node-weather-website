const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4b35ca1b645ae1a4cc2d2715d17a286b&query=' + latitude + ',' + longitude + '&units=f';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weatherstack.', undefined);
        } else if (body.error) {
            callback('Unable to find the location provided.', undefined);
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees outside. It feels like ' + body.current.feelslike + ' degrees.')
        }
    });
};

module.exports = forecast;