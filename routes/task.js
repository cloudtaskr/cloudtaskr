const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
// import the model that will be used for the tasks collection
const Task = require('../models/task');

// POST route => to create a new task
router.post('/projects', (req, res, next)=>{
 
  Project.create({
    title: req.body.title,
    description: req.body.description,
    // subTasks: []
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;