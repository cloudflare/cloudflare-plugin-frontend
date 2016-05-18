var request = require('request')
var querystring = require('querystring');
var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');

const PORT = 8080; 
const HOST_URL = "https://api.cloudflare.com/host-gw.html";
const V4_URL = "https://api.cloudflare.com/client/v4"

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
    if (process.env.DEBUG) {
        console.log("*************************************************");   
        console.log("START " + req.method + " " + req.url);
        console.log("BODY" + JSON.stringify(req.body));
        console.log("QUERY" + JSON.stringify(req.query));
        console.log("PARAMS" + JSON.stringify(req.params));
    }

    
    
    var url = req.url;
    var proxyURL = req.query.proxyURL;
    if (proxyURL === undefined) {
        proxyURL = req.body.proxyURL;
    }

    if (req.method == "OPTIONS") {
        res.send("myApi OPTIONS\n", {
            "Allow": "GET, OPTIONS",
            "Content-Type": "text/plain"
        }, 200);
    }



    if (proxyURL.lastIndexOf("http", 0) !== 0) {
        // Handle static requests
        var data = fs.readFileSync(proxyURL);
        res.end(data.toString());
    } else {

        var options = {
            method: req.method,
            json: true, 
            url: proxyURL,
            // headers: req.headers
            headers: {
                'Content-Type': 'application/json',
            }
        }

        if (proxyURL.indexOf(HOST_URL) > -1) {
            // Add host key to params
            var params = JSON.parse(JSON.stringify(req.body));;
            params.host_key = process.env.HOSTKEY
            delete params.proxyURL; 
            options.form = params;
        } else if (proxyURL.indexOf(V4_URL) > -1) {
            options.headers = {
                'X-Auth-Key': process.env.V4_APIKEY,
                'X-Auth-Email': process.env.V4_EMAIL,
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

app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT);
    if (process.env.DEBUG) {
        console.log('Debug Logs Active');
    }
});
