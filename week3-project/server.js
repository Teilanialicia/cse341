/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const env = require("dotenv").config();
const app = express();
const connectDb = require("./routes/data/database");
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const GitHubStrategy = require('passport-github2').Strategy;

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Database
 *************************/
connectDb();


/* ***********************
 * Express Setup
 *************************/
app.use(express.json({ extended: false }));
app.use(cors());

/* ***********************
 * Oauth setup
 *************************/
// Set up the session and save a cookie named secret (ideally it should be some random letters)
app.use(session({
  cookie: { maxAge: 86400000},
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
  }),
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}))

// Start up passport (which will help with Oauth)
app.use(passport.initialize())
app.use(passport.session())

/* ***********************
 * Middleware
 *************************/
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  // Use this to store the user into the Db
  //User.findOrCreate({ githubId: profile.id }, function (err, user) {
  return done(null, profile);
  //});
}
))

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});


/* ***********************
 * Routes
 *************************/
// Prevent CORS issues
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes'));

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
})
