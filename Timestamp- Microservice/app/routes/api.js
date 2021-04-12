var expect = require('chai').expect;
var moment = require('moment')

module.exports = function (app) {
  


    
  app.route("/api/timestamp").get( function (req, res) {
	
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
    
	var date = req.query.input
  
  if(date == null || date == ""){
  	var date = new Date()
    var local = date.toLocaleString()
    var unix = new Date(local)
      		res.json("unix: " + unix.getTime() +  " , natural: "+ unix.toUTCString()  )
  }
  else{
  	if(isValidDate(date) == "f"){
  		res.json("unix: " + null + " , natural: Invalid Date" )
  	}
  	else if(isValidDate(date) == "ux"){
  		var validUnix = moment.unix(date)
      var dateUnix = new Date(validUnix)
  		res.json("unix: " + date  +" , natural: " + dateUnix.toUTCString() )
  	}
  	else {
  		var validDate = new Date(date)
  		res.json("unix: " + validDate.getTime() + " , natural: " + validDate.toUTCString() )
  	}
  }



});
  
};
