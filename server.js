// server.js
// where your node app starts

// init project
var config = require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  if(req.params.date == null || req.params.date == undefined || req.params.date === ''){
    res.json({unix: Date.now(),utc: new Date()});
  } else if(isNaN(req.params.date)){
    let unixDate = +new Date(req.params.date);
    let utcDate = new Date(req.params.date).toUTCString();
    if(isNaN(unixDate)){
      res.json({error: "Invalid Date"});
    } else {
      console.log(unixDate);
      console.log(utcDate);
      res.json({unix: unixDate, utc: utcDate});
    } 
  } else {
    let unixDate = parseInt(req.params.date);
    let utcDate = new Date(unixDate).toUTCString();
    res.json({unix: unixDate, utc: utcDate});    
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
