const router = require("express").Router();
const auth = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({ msg: "Youtube Sync backend" });
});

router.post("/newUser", auth.signIn);
router.post("/login", auth.login);

module.exports = router;
