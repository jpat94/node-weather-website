const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Sets up handlebars (hbs) engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Name of the author
const name = 'Justin Patterson';

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name
    });
});

// Used to show the scope of the original project on UDemy
app.get('/old-index', (req, res) => {
    res.render('old-index', {
        title: 'Old Weather App Page',
        name
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        message: 'This is a simple web app developed during a NodeJS course taught by Andrew Mead on UDemy.',
        credit: 'This app utilizes Weatherstack and Mapbox API.',
        gitHub: 'For information about upcoming features, check out my GitHub repository!',
        name
    });
});

// Used to show the scope of the original project on UDemy
app.get('/old-about', (req, res) => {
    res.render('old-about', {
        title: 'Old About Page',
        name
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Some helpful text',
        name
    });
});

// Used to show the scope of the original project on UDemy
app.get('/old-help', (req, res) => {
    res.render('old-help', {
        title: 'Old Help Page',
        message: 'Some helpful text',
        name
    });
});

// Weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address.'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData)=> {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                forecastData,
                address: req.query.address
            });
        });
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found.',
        name
    });
});

// Used to show the scope of the original project on UDemy
app.get('/old-help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found.',
        name
    });
});

// 404 Pages; has to come last in the app.get list
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found.',
        name
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});