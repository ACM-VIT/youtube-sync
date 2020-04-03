const Room = require("../models/room");
const bcrypt = require("bcryptjs");
const { roomValidation } = require("./verification");

const createRoom = async (req, res) => {
  const error = await roomValidation(req.body);
  if (error) return res.json({ success: false, err: error.details[0].message });

  const roomExists = await Room.findOne({ name: req.body.name });
  if (roomExists)
    return res.status(404).json({ success: false, msg: "Room already exists" });

  const salt = await bcrypt.genSaltSync(10);
  const hashedpwd = await bcrypt.hashSync(req.body.pwd, salt);

  const newRoom = {
    name: req.body.name,
    pwd: hashedpwd
  };

  try {
    const room = await Room.create(newRoom);
    return res.json({ success: true, room });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err });
  }
};

const joinRoom = async (req, res) => {
  const error = await roomValidation(req.body);
  if (error) return res.json({ success: false, err: error.details[0].message });

  const room = await Room.findOne({ name: req.body.name });
  if (!room)
    return res.status(404).json({ success: false, msg: "No room exists" });

  const samePwd = await bcrypt.compare(req.body.pwd, room.pwd);
  if (!samePwd)
    return res
      .status(401)
      .json({ success: false, msg: "Password is incorrect" });

  return res.json({ succcess: true, room });
};

module.exports = {
  createRoom,
  joinRoom
};
