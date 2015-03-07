// Modules =====

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport= require('passport');
var flash = require('connect-flash');

// Configuration =====

// Config files
var db = require('./config/db');
require('./config/passport')(passport);

// Set port
var port = process.env.PORT || 8080;

// Connect to MongoDB
mongoose.connect(db.url);

// Parse routes
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views')

app.use(session({ secret: 'lizzardrules' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes =====
var routes = require('./app/routes');
var apiroutes = require('./app/apiroutes');

app.use('/', routes);
app.use('/api', apiroutes);
app.set('json spaces', 4);

// Start app =====
app.listen(port);

console.log('Magic happens on port ' + port);

exports = module.exports = app;
