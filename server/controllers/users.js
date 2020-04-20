const Room = require("../models/room");

const users = [];
let videoUrl = null;
let serverDuration = 0;

const updateDuration = (duration) => {
  serverDuration = duration;
}

const setUrl = (url) => {
  videoUrl = url;
}

const addUser = ({ id, name, room }) => {
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const admin = users.length === 0 ? true : false;

  const user = { id, name, room, admin };

  users.push(user);
  console.log("users array", users);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  const u = users[index];

  if (index !== -1) {
    if (u.admin && users.length >= 2) users[index + 1].admin = true;
    if (users.length - 1 === 0) {
      Room.deleteMany({ name: u.room }).then(
        console.log("successFully removed room")
      );
    }
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, updateDuration, setUrl };
