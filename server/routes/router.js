const router = require("express").Router();
const auth = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({ msg: "Youtube Sync backend" });
});

//auth part of api
router.post("/signUp", auth.signUp);
router.post("/login", auth.login);
//TODO:signout route

module.exports = router;
