//For temperature in Fahrenheit use units=imperial
//For temperature in Celsius use units=metric
const ai = process.env.TOKEN;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', { weather: null,  error: null });
})

app.all('/', function(req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ai}&units=imperial`;
  request(url, function(err, response, body) {
    if (err) {
      res.render('index', { weather: null,  error: 'Error, please try again' });
    } else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        res.render('index', { weather: null,  error: 'Error, please try again' });
      } 
      else {
        let icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        let FtoC = (weather.main.temp - 32) * 5 / 9
        let text = `
        ${weather.main.temp}° F in ${weather.name} 
        <br>
         ${FtoC.toFixed(2)}° C in ${weather.name}
         <br>
         ${weather.weather[0].description}
         <br>
         <img src="${icon}"></img>
         `;
        res.render('index', { weather: text, error: null });
      }
    }
  })
})

//https://uptimerobot.com/
app.listen(3000, function() {
  console.log('App listening on port 3000!');
})



