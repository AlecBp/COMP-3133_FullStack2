const History = require("../model/history");
const utils = require("../helpers/user");

module.exports = {
  saveMsg: ({ msg, user, room }) => {
    const history = new History({
      message: msg,
      sender: user,
      date: utils.formatDate(),
      room,
    });
    history.save();
  },
};
