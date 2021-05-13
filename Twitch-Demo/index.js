const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const server = require('http').Server(app)

app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./sockets')(server)


server.listen(3000, function() {
  console.log("Server listening at port %d", 3000);
});
