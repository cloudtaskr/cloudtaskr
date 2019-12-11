// routes/auth-routes.js

const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

// require the user model !!!!
const User = require("../models/user");

authRoutes.post("/signup", (req, res, err) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(404).json({ message: "Provide email and password" });
    return;
  }

  if (passport < 7) {
    res.status(400).json({
      message:
        "Please make your password at least 8 characters long for security purposes."
    });
    return;
  }

  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Email check failed. Try again." });
      return;
    }

    if (foundUser) {
      res.status(400).json({
        message:
          "Email is already registered. Please register with another email or login."
      });
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
          .status(400)
          .json({ message: "Saving user to DB went wrong. Try again." });
      }

      //automatically login user
      //.login() here is actually predefined passport method
      req.login(aNewUser, err => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
        }

        //send users information to the front end
        //we can use also: res.status(200).json(req.user)
        res.status(200).json(aNewUser);
      });
    });
  });
});

module.exports = authRoutes;
