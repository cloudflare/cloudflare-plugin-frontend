var request = require('request')
var querystring = require('querystring');
var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config_keys');

const PORT=8080; 

var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' == req.method) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		res.sendStatus(200);
    }
    else {
    	res.header('Content-Type', 'text/plain');
    	res.header('Access-Control-Allow-Origin', '*');
    	res.header('Access-Control-Allow-Methods', '*');
    	res.statusCode = 200;
		next();
    }
};

var app = express();
app.use(bodyParser.json())
app.use(allowCrossDomain);

app.all('/proxy', function (req, res) {
	console.log("*************************************************");	
    console.log("START " + req.method + " " + req.url);
    console.log("BODY" + JSON.stringify(req.body));
    console.log("QUERY" + JSON.stringify(req.query));
    console.log("PARAMS" + JSON.stringify(req.params));
	
	var url = req.url;
	var proxyURL = req.query.proxyURL;
	if (proxyURL === undefined) {
		proxyURL = req.body.proxyURL;
	}
	console.log("URL: " + url + " proxyURL " + proxyURL);

	if (req.method == "OPTIONS") {
		res.send("myApi OPTIONS\n", {
	        "Allow": "GET, OPTIONS",
	        "Content-Type": "text/plain"
	    }, 200);
	}

	if (proxyURL == "./config.js" || proxyURL == "./lang/en.js") {
		// Handle static requests
		var data = fs.readFileSync(proxyURL);
		res.end(data.toString());
	} else {
		// Add host key to params
		var params = JSON.parse(JSON.stringify(req.body));;
		params.host_key = config.hostkey;
		delete params.proxyURL;

		console.log("Host " + JSON.stringify(params));

		var options = {
			method: req.method,
			form: params,
			json: true, 
			url: proxyURL,
			// headers: req.headers
			headers: {
				'Content-Type': 'application/json'
			}
		}

		request(options, function (err, newRes, body) {
			if (err) {
				console.log('Error :', err);
				res.end(JSON.stringify(body));
				return
			}

		 	res.header('Content-Type', 'application/json');
			res.end(JSON.stringify(body));
		});		
	}
});

app.post('/proxy', function (req, res) {
	console.log("*************************************************");	
    console.log("START " + req.method + " " + req.url);
    // console.log("BODY" + JSON.stringify(req.body));
});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT);
});
