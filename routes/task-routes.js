const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// import the model that will be used for the tasks collection
const Task = require("../models/task-model");
const User = require("../models/user-model");
// var bodyParser = require('body-parser')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

// GET route => get all the tasks in the collection
router.get("/tasks", (req, res, next) => {
  // console.log("what are you printing");
  // if(req.user) {

  //   console.log("user exist", req.user.email);
  // }
  // else {
  //   console.log("user doesn't exist")
  // }
    Task.find({ owner: req.user._id }).then(allProjects => {
      // console.log(req.user + "+++++++++++++++");
      // console.log(req.session);
      res.json(allProjects);
    })
});

// GET route => to get all the projects
router.get("/projects", (req, res, next) => {
  Project.find()
    .populate("tasks")
    .then(allTheProjects => {
      res.json(allTheProjects);
    })
    .catch(err => {
      res.json(err);
    });
});

// POST route => to create a new task
router.post("/tasks", (req, res, next) => {
  //  console.log("-=-=-=-=-=-=-=-=-=-=-=-=-",req.body, req.session, req.user)
  console.log(req.user._id);
  console.log(req.user);
  Task.create({
    title: req.body.title,
    description: req.body.description,
    // subTasks: []
    owner: req.user._id
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
