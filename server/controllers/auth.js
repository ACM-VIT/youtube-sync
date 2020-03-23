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
    type:[String]
*/

const signUp = async (req, res) => {
  const newUser = { ...req.body };
  //TODO: VALIDATE USER

  const handleExists = await User.findOne({ handle: newUser.handle });
  if (emailExists) return res.status(404).send("email exists");

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
  const user = { ...req.body };

  //TODO:Validate User
  //TODO:JWT and Sessions
  //TODO:hash pwd verfication

  try {
    const temp = await User.findOne({ handle: user.handle });
    if (!temp)
      return res.send(401).json({ success: false, error: "No user exists" });

    return res.status(200).json({ sucess: true, user: temp });
  } catch (err) {
    console.error(err);
    return res.staus(500).json({ success: false, error: "DB Error" });
  }
};

module.exports = {
  signUp,
  login
};
