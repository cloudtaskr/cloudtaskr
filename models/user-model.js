const { Schema, model } = require('mongoose'); 
const PLM = require('passport-local-mongoose'); 

const userSchema = new Schema(
  {
    email: {type: String
      // , required: true
    },
    password: {type: String
      // , required: true
    },

    username: {type: String, unique: true},
    firstName: String,
    lastName: String,
    zones: Array,
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(PLM, { usernameField: 'email' });
module.exports = model('User', userSchema);