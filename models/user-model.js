// import Schema and model from mongoose
const { Schema, model } = require('mongoose');
/** 
 * - import passport-local-mongoose
 * - this is a mongoose plugin that simplifies building the username and password login with passport
 * */ 
const PLM = require('passport-local-mongoose'); 

/** 
 * - everything in Mongoose starts with a Schema 
 * - each schema maps to a MongoDB collection and defines the shape of the documents within that collection
 * */
const userSchema = new Schema(
  {
    email: String,
    password: String
  },
  {
    /**
     * - timestamps is a mongoose option that adds two fields to your schema { createdAt: "created_at", updatedAt: "updated_at" } 
     * - when true is used as a value it will use the default for both createAt and updateAt
     * - if true wasn't used the code would look like this : timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
     * */ 
    timestamps: true,
  }
);

/** 
 * - in order to use the passport-local-mongoose methods we must plug it into the userSchema
 * - usernameField(optional): overwrite the default field for the username. Default is username field
 * - in this case we specify to the app that we will use the email field as the unique username isntead of a username field
 * */
userSchema.plugin(PLM, { usernameField: 'email' });

// export the User model to use in other files
module.exports = model('User', userSchema);