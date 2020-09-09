const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

const tunis = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=tunis&appid=${process.env.API_KEY}`);
const france = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=france&appid=${process.env.API_KEY}`);


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', 'views');

app.listen(3000);

app.get('/tunis', (req, res, next) => {
    tunis
        .then(data => {
            let weather = data.data.weather[0].main;
            let weatherDisc = data.data.weather[0].description;
            let temp = (data.data.main.temp - 273.15).toFixed(2);
            res.render('tunis', { weather, weatherDisc, temp });
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/france', (req, res, next) => {
    france
        .then(data => {
            let weather = data.data.weather[0].main;
            let weatherDisc = data.data.weather[0].description;
            let temp = (data.data.main.temp - 273.15).toFixed(2);
            res.render('france', {weather, weatherDisc, temp});
        })
        .catch(err => {
            console.log(error);
        })
})

app.get('/', (req, res, next) => {
    res.render('home');
});

app.use((req, res, next) => {
    res.status(404);
    res.render('404');
})
