const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 5050;

const publicDirectoryFile = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialPath = path.join(__dirname, '../template/partials');

app.use(express.static(publicDirectoryFile));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.get('/', (req, res) => {
    res.render('', {
        title: 'WeatherApps',
        fullname: 'Outioua Mohand'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        fullname: 'Outioua Mohand'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        fullname: 'Outioua Mohand',
        message: 'A CHANGER'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Veuillez mettre une addresse.'
        });
    }
    geocode(req.query.address, (error, data) => {
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error:
                        'Impossible de trouver la localisation. Essayez une autre recherche.'
                });
            }
            res.send({
                data: data,
                forecastData: forecastData
            });
        });
    });
});

// fonctionne car il s'agit de la dernière ligne et parce que le res.get intercepte la ligne avant le *
// possible de faire /weather/*
app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log('le serveur est ouvert sur le port : ' + port);
});
