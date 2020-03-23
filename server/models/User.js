const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  handle: {
    type: String
  },
  noOfSyncs: {
    type: Number
  },
  pwd: {
    type: String
  },
  friends: {
    type: [String]
  }
});

module.exports = userSchema;
