var express = require('express'),
bodyParser = require('body-parser'),
logger = require('morgan'),
adImpressions = require('./adImpressionsSvc');

var app = express();

var PORT = 3024;
 
app.use(logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser());

app.get('/ad_impressions/count', adImpressions.count);
app.get('/ad_impressions/find', adImpressions.find);
//find all
app.get('/ad_impressions', adImpressions.find);
app.get('/ad_impressions/:id', adImpressions.findById);

 
app.listen(PORT);
console.log('Ad Impressions Report Service Listening on port '+PORT+'...');

