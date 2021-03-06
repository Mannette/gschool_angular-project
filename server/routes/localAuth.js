var express = require('express'),
    router = express.Router(),
    passport = require('../auth/local'),
    User = require('../models/user.js'),
    path = require('path');


// router.get('/', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     res.sendFile(path.join(__dirname, '../../client', 'index.html'));
//     console.log(arguments);
//   })(req, res, next);
// });


router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

router.get('/status', function(req, res) {
  res.status(200).json(req.user)
})

module.exports = router;
