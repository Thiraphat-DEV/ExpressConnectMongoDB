const mongo = require("mongoose");

const userScheme = new mongo.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    default: "USER1",
  },
  age: {
    type: Number,
    default: 18,
  },
});

const User = mongo.model("user", userScheme);

module.exports = { User };
