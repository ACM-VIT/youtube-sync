const User = require("../models/User");
/*
  UserSchema:
   name: {
    type: String
  },
  handle: {
    type: String
  },
  password:{

  }
  noOfSyncs: {
    type: Number
  },
  friends: {
    t
*/
const signIn = async (req, res) => {
  const newUser = { ...req.body };
  //TODO: VALIDATE USER
  try {
    let temp = await User.create(newUser);
  } catch {}
};

module.exports = {
  signIn
};
