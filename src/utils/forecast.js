const request = require('request')
const forecast = (latitude, longitude, callback)  => {
    const url = "http://api.weatherstack.com/current?access_key=9f126019d9b853edb315b9f5708c8d8c&query=" +latitude+ "," +longitude+ "&units=f"
    request({ url, json : true}, (error, { body }) => {
        if(error)
        {
            callback("Cannot connect to weather service", undefined)
        } else if(body.error){
            callback("unable to get the location location",undefined)
        } else{
            callback(undefined,body.current.weather_descriptions+ ".It is currently " +body.current.temperature+ " degrees out. It feels like "+body.current.feelslike+" degreens out.The current humidity is"+body.current.humidity)
        }
    }) 
}

module.exports = forecast