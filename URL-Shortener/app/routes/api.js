var expect = require('chai').expect;
var moment = require('moment')
var dns = require('dns');
var shortid = require('shortid')

module.exports = function (app) {
  var url_links = []

   app.route("/new").get( function (req, res) {
	var url_data = req.query.input
  dns.lookup(url_data,  function (err, address) {
    console.log(address)
      if(address != null){  
        var id = shortid.generate()
        var url_doc = {
            short_url: id,
            original_url: url_data,
        }
        url_links.push( {id : id , url : url_data})
        res.json(url_doc)
      } 
      else {
        res.json({error: "Invalid URL"})  
      }
})
     
});
  
    app.route("/all").post( function (req, res) {
      if(url_links.length == 0 || url_links === undefined){
      res.json("Error! Database is empty. Please convert url first")
    }   
      else{
        res.json(url_links )  
      }
});
  
    app.route("/new/id").get( function (req, res) {
  var id = req.query.inputId
  console.log(id)
    if(url_links.length == 0 || url_links === undefined){
      res.json("f1")
    }   
    else{
  for(var i in url_links){
        	if(id === url_links[i].id){
  		 res.json(url_links[i].url);
  	}
  	else{
        res.json("f")  
  	}
      }
  }
      
});
  
  
  
};
