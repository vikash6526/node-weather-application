const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

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
        name: 'Vikash'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vikash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        description: 'Help US!!',
        name: 'Vikash'
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
        name: 'Vikash',
        errorDescription: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vikash',
        errorDescription: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is UP at port ' + port)
})