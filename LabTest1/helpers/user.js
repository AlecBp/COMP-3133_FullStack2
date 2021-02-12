const currentUsers = [];

const userJoin = async (id, username, room) => {
  const user = { id, username, room };
  currentUsers.push(user);
  return user;
};

const getCurrentUser = (id) => {
  return currentUsers.find((user) => user.id === id);
};

const userLeave = (id) => {
  const index = currentUsers.findIndex((user) => user.id === id);

  if (index !== -1) {
    return currentUsers.splice(index, 1)[0];
  }
};

const getRoomUsers = (room) => {
  return currentUsers.filter((user) => user.room === room);
};

const formatDate = () => {
  const m = new Date();
  return (
    m.getUTCFullYear() +
    "/" +
    ("0" + (m.getUTCMonth() + 1)).slice(-2) +
    "/" +
    ("0" + m.getUTCDate()).slice(-2) +
    " " +
    ("0" + m.getUTCHours()).slice(-2) +
    ":" +
    ("0" + m.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + m.getUTCSeconds()).slice(-2)
  );
};

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  formatDate,
};
