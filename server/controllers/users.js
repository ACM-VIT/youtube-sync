const Room = require("../models/room");

const users = [];
let urls = [];
let serverDuration = 0;

const updateDuration = (duration) => {
  serverDuration = duration;
}

const upvote = ({ selUrl, room }) => {
  if (!selUrl || !room) return { error: "Url and room required" };
  const dbUrl = urls.find(ele => ele.room === room && ele.url === selUrl);
  if (!dbUrl) return { error: "No url found" };
  dbUrl.upvotes = dbUrl.upvotes + 1;
  return { dbUrl };
}

const setUrl = ({ url, room }) => {

  const existingUrl = urls.find(
    (arrUrl) => arrUrl.url === url && arrUrl.room === room
  );
  if (!url || !room) return { error: "Url and room required" };
  if (existingUrl) return { error: "Url is already submitted" };

  const dbUrl = {
    url,
    room,
    upvotes: 0
  }

  urls.push(dbUrl);
  console.log("dbUrls", urls);

  return { dbUrl }
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
      urls = urls.filter(ele => ele.room != u.room);
    }
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, updateDuration, setUrl, upvote };
