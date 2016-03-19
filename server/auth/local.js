var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var init = require('./init');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.use(new LocalStrategy({
//   session: true
// },
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, {id: user.id});
//     });
//   }
// ));

init();

module.exports = passport;
