const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  description: String,
  // subTasks: [{type: Schema.Types.ObjectId, ref: 'SubTask'}],
  // owner will be added later on
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;