const request = require('request');

const geocode = (address, callback) => {
    const urlGeocoding =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1IjoibW9oYW5kZSIsImEiOiJjazc3cXp2cGwwOG14M21wZG90NHI3bHo1In0.iKGyl5I9kv5pJ5k6bMYUXQ&limit=1';

    request({ url: urlGeocoding, json: true }, (error, response) => {
        if (error) {
            callback(
                'We got a problem with your internet connection',
                undefined
            );
        } else if (
            response.body.message === 'Not Authorized - No Token' ||
            response.body.message === 'Not found' ||
            response.body.features.length == 0
        ) {
            console.log('Unable to connect to the API ', undefined);
        } else {
            const data = {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                place: response.body.features[0].place_name
            };
            callback(undefined, data);
        }
    });
};

module.exports = geocode;
