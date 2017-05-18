// Kristen Marventano

// For app backend/frontend
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hbs = require("hbs");
const path = require("path");

// For data
var mongoose = require('mongoose');

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

// Bring in the data schemas
require('./db');
const Diary = mongoose.model("Diary");
const Entry = mongoose.model("Entry");
const User = mongoose.model("User");

// Passport setup
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Log method and path
app.use(function(req, res, next) {
    console.log(req.method, req.path);
    next();
});

// Get for / path
app.get('/', function(req, res) {
    res.redirect("/about")
});

// Get for login path
app.get('/login', function(req, res) {
    res.render("login", {});
});

// Process the login
app.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/diary');
});

// Get for registration path
app.get('/register', function(req, res) {
    res.render("registration", {});
});

// Process registration
app.post('/register', function(req, res) {
    // Register the user
    User.register(
        // Create new user with their own diary
        new User({ username : req.body.username,
            diary: new Diary({entries: []})
        }),

        // Set the password
        req.body.password, function(err, account) {
            // If something went wrong, log error, let user register again
            if (err) {
                console.log(err);
                return res.render('registration', { account : account});
            }

            // Log user in and send them to their diary
            passport.authenticate('local')(req, res, function () {
                res.redirect('/diary');
            });
        }
    );
});


// Get for diary path
app.get('/diary', function(req, res) {
    // If the user is logged in
    if (req.user !== undefined){
        // Get the user's diary
        const diary = req.user.diary;

        // Display it and allow user to add entries
        res.render("diary", {user: req.user, entries: diary.entries});
    }

    else {
        // Direct user to register or login
        res.render("diary", {user: undefined});
    }

});

// Process diary entry
app.post('/diary', function(req, res) {
    // Get the user and their diary
    const user = req.user;
    const diary = req.user.diary;

    // Create the entry
    const e = new Entry({
        date: req.body.date,
        mood: req.body.mood,
        behavior: req.body.behavior,
        enviornment: req.body.enviornment,
        entry: req.body.entry
    });

    // Add it to the diary
    diary.entries.push(e);

    // Save the user
    user.save(function (err) {
        // If something went wrong, log error
        if (err){
            console.log(err);
        }

        // Go back to diary page
        res.redirect("diary");
    });
});

// Get for about path
app.get('/about', function(req, res) {
    res.render("about", {});
});

// Get for resources path
app.get('/resources', function(req, res) {
    res.render("resources", {});
});

// Listen in on given port or 3000 if no port given
app.listen(process.env.PORT || 3000);