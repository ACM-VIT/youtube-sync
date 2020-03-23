const router = require("express").Router();
const auth = require("../controllers/auth");

router.get("/", (req, res) => {
  console.log("server up and running");
  return res.status(200).json({ msg: "Server up and running" });
});

router.post("/newUser", auth.signIn);

module.exports = router;
