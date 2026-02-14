const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters"],
  },

  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


userSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});


const UserModel = mongoose.model("User", userSchema) 
module.exports = UserModel