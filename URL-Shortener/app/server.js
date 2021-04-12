var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var apiRoutes         = require('./routes/api.js');


app.use(cors({optionSuccessStatus: 200}));
app.use(express.static('public'))
app.use(express.static('routes'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route("/").get( function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
})


apiRoutes(app);  

app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('URL Not Found');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port );
});

