var PORT = 3022;

var express 		= require('express'),
bodyParser 			= require('body-parser'),
logger 				= require('morgan');
//var connect        	= require('connect')
var methodOverride 	= require('method-override')

require('jaydata');

window.DOMParser = require('xmldom').DOMParser;
require('q');

require('./adImpressionsReport.js'); //the model

var app = express();

app.use(logger('dev'));
app.use(bodyParser());
app.use(express.query());
app.use(methodOverride());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, MaxDataServiceVersion, DataServiceVersion');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, MERGE, DELETE');
    res.setHeader('Cache-Control', 'no-cache');
    //res.setHeader("Content-Type", "text/xml, application/xml");
    if (req.method === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});

app.use("/ad_impressions/odata", $data.JayService.OData.Utils.simpleBodyReader());
app.use("/ad_impressions/odata", $data.JayService.createAdapter(dfp.adImpressionContext, function (req, res) {
    return new dfp.adImpressionContext({name: "mongoDB", databaseName:"dfp", address: "localhost", port: 27017 });
}));

app.use("/", express.static(__dirname));

app.listen(PORT);
