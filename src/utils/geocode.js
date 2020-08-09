const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmlrYXNoNjUyNjMxIiwiYSI6ImNrZDZqN3QydzAycXoyeWx2ZDk5NXZpN2YifQ.KHjveV2sJYMy7RoT1Rn85g&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location servie', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                langitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode