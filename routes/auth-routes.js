const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const passport = require('../config/passport');

// signup POST
router.post("/signup", (req, res, err) => {
  let password = req.body.password;
  let incomingUserObj = {
    email: req.body.email
  };

  User.register(incomingUserObj, password)
  .then((user) => { 
      req.login(user, function(err,result){
        res.json(user)
      })
  })
  .catch((err) => { 
    res.status(500).json({ err })
  });
})

// check if user is logged in
router.get('/isLoggedIn', (req, res, next) => {  
  res.json(req.user)
})

// logout POST
router.post('/logout', (req, res, next) => {  
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

// login POST
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  console.log("login whats inside req", req)
  console.log("login whats inside req.user", req.user)
  res.json(req.user);
})

// not used yet
router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = router;