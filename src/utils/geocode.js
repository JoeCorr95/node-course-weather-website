const request = require ('postman-request');

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=fa26fe044a90c67a1d64518a87a2a9c4&query=' + encodeURIComponent(address)
    request({ url : url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        } else if (body.data.length === 0) {
            callback('no matching location', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                placeName: body.data[0].name
            })
        }
    })
};

module.exports = geocode;