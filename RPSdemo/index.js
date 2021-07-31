const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(3000, () => {
  console.log('server started');
});