const router = require("express").Router();
const auth = require("../controllers/auth");
const room = require("../controllers/room");

router.get("/", (req, res) => {
  return res.json({ msg: "Youtube Sync backend" });
});

router.post("/login", auth.login);

router.post("/createRoom", room.createRoom);
router.post("/joinRoom", room.joinRoom);

module.exports = router;
