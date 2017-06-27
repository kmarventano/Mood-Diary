// Kristen Marventano
// Mongoose Schemas for the site

// Bring in mongoose/setup passport
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

// Diary entries consist of date, mood, behavior, environment, and entries
const Entry = new mongoose.Schema({
    date: String,
    mood: [String],
    behavior: String,
    environment: String,
    entry: String
});

// Diaries are a collection of entries
const Diary = new mongoose.Schema({
    entries: [Entry]
});

// Users are uniquely identified with username/passwords and have a diary
const User = new mongoose.Schema({
    username: String,
    password: String,
    diary: Diary
});


// User authentication is done with passport
User.plugin(passportLocalMongoose);

// Create data models to use in the app
mongoose.model('Entry', Entry);
mongoose.model('Diary', Diary);
mongoose.model('User', User);

mongoose.connect('mongodb://localhost/krm411');