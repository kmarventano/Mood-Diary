# Mood Diary

## Overview

Mood Diaries are a common way of dealing with negative emotions. By tracking emotions along with behaviors and environment, people can learn their triggers and better ways to cope.  They can be used in conjunction with therapy to treat a variety of mental illnesses, or just to gain a better understanding of self. 


## Data Model

The application will store Users and their diaries. Diaries are made up of entries contain the user's mood, behavior, enviornment, and a traditional entry with more info.

An Example User:

```javascript
{
  username: "mopeyInManhattan",
  password: // a password hash,
  diary: // Array containing different diary entries
  viewers: // Array of approved viewers
}
```

An Example Entry

```javascript
{
  mood: // Array of strings containing the mood e.g ["Sad", "anxious"] 
  behavior: // String describing what user was doing 
  enviornment: // String containing where the user was (and optionally time date)
  entry: // String with more details (thoughts/space for traditional diary entry)
}
```

An Example Diary

```javascript
{
entries: // Array of all the entries a user has made
}
```


## [Link to Commented First Draft Schema](https://github.com/nyu-csci-ua-0480-008-spring-2017/krm411-final-project/blob/master/db.js) 

## Wireframes

/login - login page
![login](documentation/About.png)

/, /about - page that explains what the web app does/purpose
![home](documentation/About.png)
 
/diary - page for showing all diary entries (with comments) and form to add entries

![diary](documentation/Diary.png)

/resources - page where users can find resources to find support/help

![resources](documentation/Resource.png)

/


## User Stories or Use Cases

1. as a non-registered user, I can register a new account with the site
2. as a regular user, I can view my diary, add entries, comment on diary entries, and add/remove viewers to my diary
3. as a viewer user, I can view approved diaries and make comments on them

## Research Topics

* (2 points) Use a CSS framework (Bootstrap) throughout site
    * Have a consistent aesthetic format across the site
* (5 points) User authentication 
    * Use external API for better security
* (1 points) Lavish 
    * Generate a great color scheme for bootstrap 

8 points total out of 8 required points 


## [Link to Initial Main Project File](https://github.com/nyu-csci-ua-0480-008-spring-2017/krm411-final-project/blob/master/app.js) 

## Annotations / References Used

1. [passport.js authentication docs](http://passportjs.org/docs) - [Configuring passport](https://github.com/nyu-csci-ua-0480-008-spring-2017/krm411-final-project/blob/master/app.js#33) 
[Implenting login/registration (lines 58 and 75)](https://github.com/nyu-csci-ua-0480-008-spring-2017/krm411-final-project/blob/master/app.js) 
2. [Lavish](http://www.lavishbootstrap.com) - (https://github.com/nyu-csci-ua-0480-008-spring-2017/krm411-final-project/blob/master/public/css/lavish-bootstrap.css)
3. [tutorial on bootstrap](https://www.w3schools.com/bootstrap/default.asp) - (https://github.com/nyu-csci-ua-0480-008-spring-2017/krm411-final-project/blob/master/views/diary.hbs) 
