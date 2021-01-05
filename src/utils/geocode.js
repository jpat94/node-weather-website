const request = require('request');

// Creates a geocode function that utilizes mapbox api to get the latitude and longitude of the provided location
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianBhdDk0IiwiYSI6ImNraHZmbGxzcjBma2MyeW1sMGc5N3h0YjgifQ.iE-ttjnseeh0tKkmdbzU6g&limit=1';

    // Handles errors and provides the coordinates and name of the location provided
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another name.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;