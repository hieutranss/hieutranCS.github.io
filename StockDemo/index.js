const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const hashMap = require('hashmap');
const key = process.env.KEY;
const app = express();

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('index', { stock: null });
});

app.post('/', function(req, res) {
  var symbol = req.body.symbol;
  function getStock() {
    const promise = axios.get(`https://api.stocktwits.com/api/2/streams/symbol/${symbol}.json`);
    const data_promise = promise.then((res) => res.data.symbol.symbol)
    return data_promise;
  }
  getStock().then(data => {
    axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${data}&apikey=${key}`)
      .then(function(resp) {
        var map = new hashMap();
        for (var x in resp.data) {
          if (resp.data.hasOwnProperty(x))
            for (var y in resp.data[x]) {
              if (resp.data[x].hasOwnProperty(y)) {
                map.set(y, resp.data[x][y])
              }
            }
        }
        //empty map == crypto
        if(map.size == 0){
         res.render('index', { stock: "Cryptocurrency is not available" }); 
        }
        else{
      var link =  `https://finance.yahoo.com/chart/${data}`;
        res.render('index', { stock: map , chart: link , name:data });    
        }
        
      })
  })
    .catch(err => res.render('index', {  stock: "Stock " + err.response.statusText }))
})


app.listen(3000, () => {
  console.log("Listening to port 3000");
});