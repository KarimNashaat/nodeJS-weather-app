const request = require('request')

const geoCode = (address, callback) => {
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+'.json?access_token=pk.eyJ1Ijoia2FyaW1uYXNoYWF0IiwiYSI6ImNrMWdpY2J5MTBiMXQzbmw4MzlmbnZscG4ifQ.UyHlPSUUoofr4h9H-GxfWA'
    request({url: mapBoxUrl, json: true}, (error, response) => {
        if(error){
            callback('There is error with the connection', undefined)
        }
        else if (response.body.features.length === 0 ){
            callback('There is something wrong with the address', undefined)
        }
        else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode