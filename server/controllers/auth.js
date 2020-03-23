const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    type:[String]
*/

const signUp = async (req, res) => {
  const newUser = { ...req.body };
  //TODO: VALIDATE req.body

  const handleExists = await User.findOne({ handle: newUser.handle });
  if (handleExists)
    return res.status(404).json({ sucess: false, error: "handle exists" });

  const salt = await bcrypt.genSaltSync(10);
  const hashedPwd = await bcrypt.hashSync(newUser.pwd, salt);
  newUser.pwd = hashedPwd;

  try {
    const dbUser = await User.create(newUser);
    return res.json({ sucess: true, user: dbUser });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: "Signin Failed" });
  }
};

const login = async (req, res) => {
  const { handle } = req.body;
  //TODO:Validate req.body

  const user = await User.findOne({ handle });
  if (!user)
    return res
      .status(404)
      .json({ success: false, error: `User does not exist` });

  const validPassword = await bcrypt.compare(req.body.pwd, user.pwd);
  if (!validPassword)
    return res.status(404).json({ success: false, error: "invalid password" });

  const token = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET || "testlalal"
  );
  return res.header("authorization", token).json({ token });
};

module.exports = {
  signUp,
  login
};
