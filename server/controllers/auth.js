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
  //TODO:Hash pwd
  try {
    let temp = await User.create(newUser);
    return res.json({ success: true, user: temp });
  } catch (err) {
    console.error(err);
    return res.json({ success: false });
  }
};

const login = async (req, res) => {};

module.exports = {
  signIn,
  login
};
