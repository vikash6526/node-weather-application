const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather forecast App',
        name: 'David weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'David about'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        description: 'Help US!!',
        name: 'David Help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address term'
        })
    }
    geocode(req.query.address, (error, { latitude, langitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, langitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                    address: req.query.address,
                    location,
                    forecast: forecastdata.weatherDescription + '. It is currently ' + forecastdata.temperature + ' but feelslike ' + forecastdata.feelslike
                })
                //console.log(location)
                //console.log(forecastdata.weatherDescription + '. It is currently ' + forecastdata.temperature + ' but feelslike ' + forecastdata.feelslike)
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide address term'
        })
    }
    res.send({
        products: [{
            address: req.query.address
        }]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'David Help error',
        errorDescription: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'David error',
        errorDescription: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is UP at port 3000')
})