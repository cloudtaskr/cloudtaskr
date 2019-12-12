const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: String,
    password: String
  },
  {
    //true is the default for both createAt and updateAt
    //timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    timestamps: true

  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
