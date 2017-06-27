// Kristen Marventano

// For app backend/frontend
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hbs = require("hbs");
const path = require("path");
const router = require("./routes/index.js");

// For authentication
var session = require('express-session');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Middleware to establish path, use bodyparser, enable sessions/passport
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'Kr1$t3nR0cK$',
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// Handle bars setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Log method and path
app.use(function(req, res, next) {
    console.log(req.method, req.path);
    next();
});

// Routes to all the pages
app.use('/', router);

// Listen in on given port or 3000 if no port given
app.listen(process.env.PORT || 3000);
