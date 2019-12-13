const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
// import the model that will be used for the tasks collection
const Task = require('../models/task-model');
const User = require('../models/user-model');
// GET route => get all the tasks in the collection
router.get("/tasks", (req, res, next) => {
  Task.find()
  .then( allProjects => {
    res.json(allProjects);
  })
});

// GET route => to get all the projects
router.get('/projects', (req, res, next) => {
  Project.find().populate('tasks')
    .then(allTheProjects => {
      res.json(allTheProjects);
    })
    .catch(err => {
      res.json(err);
    })
});

// POST route => to create a new task
router.post('/tasks', (req, res, next)=>{
 
  Task.create({
    title: req.body.title,
    description: req.body.description,
    // subTasks: []
    owner: req.session.currentUser._id
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;