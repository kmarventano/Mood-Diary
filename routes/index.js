// Kristen Marventano

// For app frontend/backend
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require("hbs");
const path = require("path");
const router = express.Router();

// For data
var mongoose = require('mongoose');

// For authentication
var session = require('express-session');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Bring in the data schemas
require('../db');
const Diary = mongoose.model("Diary");
const Entry = mongoose.model("Entry");
const User = mongoose.model("User");

// Passport setup
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Get for / path
router.get('/', function(req, res) {
    res.redirect("/about")
});

// Get for login path
router.get('/login', function(req, res) {
    res.render("login", {});
});

// Process the login
router.post('/login',function(req, res, next) {
    passport.authenticate('local', function(err, user, info){
        // If the username doesn't exist or password is incorrect
        if (err || !user) {
            console.log(err);
            return res.render('login', {error : "Incorrect Username " +
            "or Password"});
        }

        // Login user
        req.logIn(user, function(err) {
            // If the login failed
            if (err){
                return res.render('login', {error : "Try again"})
            }

            // If successful, send user to their diary
            res.redirect('/diary');
        });
    })(req, res, next);

});

// Get for registration path
router.get('/register', function(req, res) {
    res.render("registration", {});
});

// Process registration
router.post('/register', function(req, res) {
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
                return res.render('registration', { account : account,
                    error : "Registration failed"});
            }

            // Log user in and send them to their diary
            passport.authenticate('local')(req, res, function () {
                res.redirect('/diary');
            });
        }
    );
});


// Get for diary path
router.get('/diary', function(req, res) {
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
router.post('/diary', function(req, res) {
    // Get the user and their diary
    const user = req.user;
    const diary = req.user.diary;

    // Create the entry
    const e = new Entry({
        date: req.body.date,
        mood: req.body.mood,
        behavior: req.body.behavior,
        environment: req.body.environment,
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
router.get('/about', function(req, res) {
    res.render("about", {});
});

// Get for resources path
router.get('/resources', function(req, res) {
    res.render("resources", {});
});


// Export the router
module.exports = router;