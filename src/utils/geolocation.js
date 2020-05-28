const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibXNhdW15YWEiLCJhIjoiY2thand0bnVoMGV3MzJ0cGkyN2x5cmh2diJ9.nI2HS0r8r6mU59xnyth0ng&limit=1"
    request({ url, json:true }, (error, { body }) => { 
        if(error){
            callback("unable to connect to weather service", undefined)
        } else if(body.features.length===0){
            callback("unable to get location", undefined)
        }else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode