const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weatherForecast = require('./utils/weatherForecast');
const request = require ('postman-request');

const app = express();

//Define paths for express config
const PublicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to display
app.use(express.static(PublicDirectoryPath))

//home page
app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Joe'
    })
})

//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Joe'
    })
})

//help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Welcome to the help screen',
        helpMessage: 'We are here to help',
        name: 'Joe'
    })
})

//req=request res=response
//weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, data = {}) => {
        if (error) {
            return res.send({ error })
        }
        weatherForecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } 
            
            res.send({
                forecast: forecastData,
                location: data.placeName,
                address: req.query.address
            })
        });
    })
    
});

//playing with query string
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Joe'
    })
})

//404 handler
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Joe'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
});