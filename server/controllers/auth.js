const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("./verification");
/*
  UserSchema:
   name: {
    type: String
  },
  noOfSyncs: {
    type: Number
  },
 createdAt: {
    type:[String]
*/

const login = async (req, res) => {
  if (!req.body.name)
    return res.status(500).json({ success: false, msg: "No name in req" });

  const token = jwt.sign({ name: req.body.name }, process.env.TOKEN_SECRET);
  if (!token)
    return res
      .status(500)
      .json({ sucess: false, msg: "Failed to issue token" });

  const dbUser = await User.findOne({ name: req.body.name });
  if (dbUser) return res.json({ success: true, user: dbUser, token });

  const newUser = {
    ...req.body,
    noOfSyncs: 0,
    createdAt: new Date().toLocaleDateString()
  };

  const { error } = loginValidation(newUser);
  if (error) return res.status(500).json({ success: false, err: error });

  try {
    const user = await User.create(newUser);
    return res.json({ success: true, user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err });
  }
};

module.exports = {
  login
};
