const request = require ('postman-request');


const weatherForecast = (latitude, longitude, callback) => {
    let url = 'http://api.weatherstack.com/current?access_key=c40f4cc0f0a44df3eacde695db73b917&query=' + latitude + ',' + longitude
    request({ url : url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        }else if (response.body.error) {
            callback(response.body.error.info, undefined)
        }else {
            callback(undefined, response.body.current.weather_descriptions[0])
        }
    })
}

module.exports= weatherForecast;

