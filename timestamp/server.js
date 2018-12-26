var express = require('express');
var app = express();
var moment = require('moment')
var url = require('url')

require('dotenv').config()


app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get("/api/timestamp/:date_string?", function (req, res) {

	
function isValidDate(str) {
  var d = moment(str,['M-D-YY','M-D-YYYY','YY-M-D','YYYY-M-D'], true)
  var unix = moment.unix(str)

  if(!d.isValid() && !unix.isValid()) {
  	return "f"
  }
  else if(d.isValid() && !unix.isValid()){
  	return str.indexOf(d.format('M-D-YYYY')) >= 0 
      || str.indexOf(d.format('M-D-YY')) >= 0 
      || str.indexOf(d.format('YY-M-D')) >= 0 
      || str.indexOf(d.format('YYYY-M-D')) >= 0  
  }
  else if(!d.isValid() && unix.isValid()){
  	return "ux"
  }
}

	var date = req.params.date_string
  

  if(date == null){
  	var localDate = new Date()
  	res.json(localDate.toLocaleString())
  }
  else{
  	if(isValidDate(date) == "f"){
  		res.json({"unix": null, "natural": "Invalid Date" })
  	}
  	else if(isValidDate(date) == "ux"){
  		var validUnix = moment.unix(date)
  		res.json({"unix": date, "natural": validUnix.format('MMMM DD YYYY') })
  	}
  	else {
  		var validDate = new Date(date)
  		res.json({"unix": validDate.getTime(), "natural": validDate.toUTCString() })
  	}
  }


});



var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port );
});