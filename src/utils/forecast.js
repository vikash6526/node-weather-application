const request = require('request')

const forecast = (lat, lang, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=93b3a00bf0f11e9937afd6f53bec0d4a&query=' + lat + ',' + lang + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect weather service', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                weatherDescription: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast