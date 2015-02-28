// Modules =====

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

// Configuration =====

// Config files
var db = require('./config/db');

// Set port
var port = process.env.PORT || 8080;

// Connect to MongoDB
mongoose.connect(db.url);

// Parse routes
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// Routes =====
var routes = require('./app/routes');

app.use('/api', routes);

// Start app =====
app.listen(port);

console.log('Magic happens on port ' + port);

exports = module.exports = app;
