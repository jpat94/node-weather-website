const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Set for heroku and our local machine if running for testing
const port = process.env.PORT || 3000;

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

// Renders the index view for the landing page
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

// Renders the about page that leads to the github repository and the original website built during the UDemy course
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        message: 'This is a simple web app developed during a NodeJS course taught by Andrew Mead on UDemy.',
        credit: 'This app utilizes Weatherstack and Mapbox API.',
        gitHub: 'For information about upcoming features, check out my GitHub ',
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

// Renders the help page which at the moment doesn't have any real content
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

// Renders the weather page where a user can enter the address, city, or zip code to get current weather data
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address.'
        });
    }
    
    // Utilizes the geocode and forecast utility; geocode takes the entered information and turns it into a latitude and longitude
    // that is then used by forecast to provide current weather data for the provided location or return an error if an invalid
    // address was provided
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

// Renders a 404 error page in case a user tries to navigate past the help page into a help article that does not exist
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

// 404 Pages for invalid addresses manually entered in by the user
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found.',
        name
    });
});

// Code to signal that the server is up and running
app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});