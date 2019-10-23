const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const forecast = require('./Utils/weather-api')
const geocode = require('./Utils/location-api')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>
{   
    res.render('index', {
        title: 'Weather App',
        name: "Karim Nashaat"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error:'Please enter address'})
    }
    else {
        geocode(req.query.address, (error, {longitude, latitude,location} = {}) => {
            if (error){
                return res.send({error:error})
            }
            else {
                forecast(longitude, latitude, (error, data) => {
                    if( error) {
                        return res.send({error})
                    }
                    else {
                        return res.send({
                            weather: data,
                            location: location
                        })
                    }
                })
            }
        })
    }
})
app.get('/help', (req, res) => {
    res.render('help',
    {helpText: 'Helping page',
    title: 'Help',
    name: 'Karim Nashaat'
})
})

app.get('/About', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Karim Nashaat',

    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        errorMessage: 'This page is not found',
        title: '404',
        name: 'Karim Nashaat'
    })
})

app.listen(3000)