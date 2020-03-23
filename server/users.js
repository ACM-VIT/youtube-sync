const users = [];

const addUser = ({ id, name, room, password }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingChatUser = users.find(
    (ele) => ele.room === room && ele.name === name
  );

  if (!name || !room) return { error: `Username and room are required` };
  if (existingChatUser) return { error: `User Already In Room` };

  const newUser = {
    id,
    name,
    room
  };
  users.push(newUser);
  return { newUser };
};

const removeUser = (id) => {
  const index = users.findIndex((ele) => ele.id === id);
  if (index != -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((ele) => ele.id === id);

const getUserInRoom = id;
