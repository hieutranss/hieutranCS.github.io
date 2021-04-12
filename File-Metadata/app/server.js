
    const express = require('express')
    const cors = require('cors')
    const bodyParser = require('body-parser')
    const multer  = require('multer')
    const fs = require("fs")
    const   util    = require( 'util' )
    const readChunk = require('read-chunk');
    const fileType = require('file-type');


    var app = express();
    app.set('view engine', 'pug')

    var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function ( req, file, cb ) {
    cb(null,  file.originalname );
    }
    }
    );

    var upload = multer({  storage: storage  }).single('upfile')

    app.use(cors({optionSuccessStatus: 200}));

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/uploads', express.static(process.cwd() + '/uploads'));

    app.route("/").get( function (req, res) {
    res.render(process.cwd() + '/views/index.pug');
    })


    app.route('/file').post(upload, function(req, res, next){
    if(!req.file){
    res.render(process.cwd() + '/views/index.pug', {error: "Unable to upload a file"});
    }
    else{
    var extension = ['jpg','gif','png','jpge']
    if(req.file.mimetype === 'text/plain'){
      
    fs.readFile(req.file.path, 'utf8' , (err,data)=>{
    if(err){
    res.render(process.cwd() + '/views/index.pug', {error: "Unable to read a file"});
    }
        function deleteFile() {
       fs.unlink(req.file.path, (err) => {
          if(err){
            console.log(err)
       }
       console.log("sucessfull deleted ---" + req.file.path)
       })
     } 
     setTimeout(deleteFile, 10000)
    res.render(process.cwd() + '/views/index.pug', {name : "File name: " + req.file.originalname, type: "File type: " +req.file.mimetype, size: "File size: " + req.file.size + " byte", text: data});    
    })
    }      
    else{
    for(var i in extension){
    const buffer = readChunk.sync( req.file.path, 0, fileType.minimumBytes);
    if(fileType(buffer).ext === extension[i]){
              function deleteFile() {
       fs.unlink(req.file.path, (err) => {
          if(err){
            console.log(err)
       }
       console.log("sucessfull deleted ---" + req.file.path)
       })
     } 
     setTimeout(deleteFile, 15000);       

      
     return res.render(process.cwd() + '/views/index.pug', {name : "File name: " + req.file.originalname, type: "File type: " +req.file.mimetype, size: "File size: " + req.file.size + " byte", location: req.file.path});

    }
      else if (fileType(buffer).ext !== extension[i]){
          function deleteFile() {
       fs.unlink(req.file.path, (err) => {
          if(err){
            console.log(err)
       }
       console.log("sucessfull deleted ---" + req.file.path)
       })
     } 
     setTimeout(deleteFile, 15000);
       return res.render(process.cwd() + '/views/index.pug', {name : "File name: " + req.file.originalname, type: "File type: " +req.file.mimetype, size: "File size: " + req.file.size + " byte"});
        
      }

    }

    }


    }

   
    

   

      
      
    });


    app.use(function(req, res, next) {
    res.status(404)
    .type('text')
    .send('URL Not Found');
    });



    app.listen(process.env.PORT || 3000, function () {
    console.log('Node.js listening ...');
    });