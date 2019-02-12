// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// /api/timestamp/:date_string?
app.get('/api/timestamp/:date_string?', function (req,res,next){
  let reqDate = req.params.date_string; //retrieve the date from the URL
  // Checks if the the retrieved date is Undefined, and assigns the current date.
  if( reqDate == undefined){
    req.date = new Date();
  }
  else
  {
    // Checks if the date is in unix form and parses the date portion of the URL input into an Integer.
    if(!isNaN(reqDate)){
      reqDate = parseInt(reqDate);
    }
    // Stores the URL date as a Date type as part of the request.
    req.date = new Date(reqDate);
  }
  next();
},function(req,res){
  // returns a JSON object of the date in Unix and UTC formats and provides a suitable response for invalid date URL entries.
  res.json({"unix": (req.date).getTime(), "utc": (req.date).toUTCString()});
});