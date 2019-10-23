const request = require('request')

const forecast = (longitude, latitude, callback) =>{
    const darSkyUrl = 'https://api.darksky.net/forecast/c65f95080954080486cb28d530bdfe2d/'+ longitude+ ','+latitude +'?units=si'
    request({url: darSkyUrl, json: true}, (error, response) => {
        debugger
        if(error){
            callback('There is something wrong with connection', undefined)
        }
        else if(response.body.error){
            callback('There is something wrong the long or lat', undefined)
        }
        else{
            callback(undefined, 'The temperature is: ' + response.body.currently.temperature+ '. The weather for today is '+  response.body.currently.summary)
        }
    })
}



module.exports= forecast