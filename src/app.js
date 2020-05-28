const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geolocation')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000
// by default express

// console.log(__dirname) // directory name in which current file exist
// console.log(__filename)
//console.log(path.join(__dirname,'../public'))
publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') //setting view engine using express
app.set('views', viewPath) //customizing view path
hbs.registerPartials(partialsPath)
// ############################ To use static external page in public directory ############################
app.use(express.static(publicDirectoryPath)) 


// ############################ To use dynamic hbs(handlebars) page to render views ############################
app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Saumya'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Saumya'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        'title' : 'Help',
        'msg' : 'This is help msg this is help msgthis is help msgthis is help msgthis is help msgthis is help msgthis is help msgthis is help msgthis is help msgthis is help msgthis is help msgthis is help msgthis is help msgthis is help msg',
         name : 'Saumya'
    })
})



/* THIS CODE WILL NOT RUN AS STATIC IDENTIFIES THE DEFAULT FILE in public directory(index.html)
app.get('', (req,res) => {
    res.send('Hello Express')
})


app.get('/help', (req,res) => {
    res.send('Help page!')
})

app.get('/about', (req,res) => {
    res.send('<h1>About page!</h1>')
})
*/

app.get('/weather', (req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error : 'No address is provided'
        })
    }
    const location = req.query.address;
    geocode(location, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error : error
            })
        }    
        forecast(latitude,longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error
                })
            }  
            res.send({
                forecast : forecastdata,
                location,                
                address : req.query.address,
            })
          })
    })

    
})

app.get('/product', (req,res) => {
    if(!req.query.product)
    {
        return res.send({
            error : 'No search term provided'
        })
    }
    res.send({
        product : []
    })
})
app.get('/help/*', (req,res) => {
    res.render('404.hbs', {
        errormsg : 'Help Article Not Found',
        title : '404',
        name : 'Saumya'
    })
})

app.get('*', (req,res) => {
    res.render('404.hbs', {
        errormsg : 'Page Not Found',
        title : '404',
        name : 'Saumya'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on '+ port)
})