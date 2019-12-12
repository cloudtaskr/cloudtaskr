// routes/auth-routes.js

const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

// require the user model !!!!
const User = require("../models/user-model");

authRoutes.post("/signup", (req, res, err) => {

  const email = req.body.email;
  const password = req.body.password;
  
  if (!email && !password) {
    res.json({ message: "Provide info" }).status(404);
    return;
  }
  if (!email) {
    res.json({ message: "Provide an email" }).status(404);
    return;
  }
  if (!password) {
    res.json({ message: "Provide a password" }).status(404);
    return;
  }

  
    if (password.length < 7) {
      res.json({
        message: "Please make your password at least 8 characters long for security purposes."
      }).status(400);
      return;
    }
  
  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      res.json({ message: "Email check failed. Try again." }).status(500);
      return;
    }

    if (foundUser) {
      res.json({
        message:
          "Email is already registered. Please register with another email or login."
      })
      .status(400);
      return;
    }

    //set hash and salt
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      email: email,
      password: hashPass
    });

    aNewUser.save(err => {
      if (err) {
        res
          .json({ message: "Saving user to DB went wrong. Try again." })
          .status(400);
      }

      //automatically login user
      //.login() here is actually predefined passport method
      req.login(aNewUser, err => {
        if (err) {
          res.json({ message: "Login after signup went bad." }).status(500);
        }
  
        //send users information to the front end
        //we can use also: res.json(req.user).status(200)
        res.json(aNewUser).status(200);
      });
    });
  });
});

authRoutes.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.json({ message: 'Something went wrong authenticating user' }).status(500);
            return;
        }
    
        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.json(failureDetails).status(401);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.json({ message: 'Session save went bad.' }).status(500);
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            res.json(theUser).status(200);
        });
    })(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.json({ message: 'Log out success!' }).status(200);
});


authRoutes.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.json(req.user).status(200);
        return;
    }
    res.json({ message: 'Unauthorized' }).status(403);
});


module.exports = authRoutes;
