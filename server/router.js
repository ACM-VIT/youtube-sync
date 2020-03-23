const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("server up and running");
  return res.status(200).json({ msg: "Server up and running" });
});

module.exports = router;
