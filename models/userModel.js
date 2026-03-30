const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the name"],
    minLength: [5, "Please enter the name more than 4 characters"],
    maxLength: [40, "Please enter the name less than  40 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please enter the email proper format"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minLength: [8, "Please enter the name more than 7 characters"],
    trim: true,
    select: true,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (pass) {
        return pass === this.password;
      },
      message: "password and confirmPassword are not same",
    },
  },
});

const User = model("Users", userSchema);

module.exports = User;
