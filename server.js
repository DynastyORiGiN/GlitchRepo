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
  let reqDate = req.params.date_string;
  console.log("The req.params.date_string returns: " + reqDate + " as a string");
  console.log("The data type of reqDate is: " + typeof(reqDate));
  console.log(parseInt(reqDate));
  
  if( reqDate == undefined){
    req.date = new Date();
    console.log("NaN input returns: " + req.date);
  }
  else
  {
    if(!isNaN(reqDate)){
      reqDate = parseInt(reqDate);
    }
    req.date = new Date(reqDate);
    console.log("The valid or invalid date returns: " + req.date);
  }
  
  next();
},function(req,res){
  res.json({"unix": (req.date).getTime(), "utc": (req.date).toUTCString()});
});