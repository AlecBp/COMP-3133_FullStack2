const utils = require("../helpers/user");
const chatService = require("../service/chatService");

module.exports = {
  initiate: (io) => {
    io.on("connection", (socket) => {
      socket.on("joinChat", async ({ username, room }) => {
        const user = await utils.userJoin(socket.id, username, room);
        socket.join(user.room);

        socket.username = user.username;

        socket.broadcast.to(user.room).emit("message", {
          msg: `${user.username} has joined &#127881;`,
          user: "Server",
        });

        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: utils.getRoomUsers(user.room),
          prevMsg: ["test", "test2"],
        });
      });

      socket.on("chatMessage", (msg) => {
        const user = utils.getCurrentUser(socket.id);
        io.to(user.room).emit("message", {
          msg: msg,
          user: user.username,
          userIcon: user.userIcon,
        });

        chatService.saveMsg({
          user: user.username,
          msg,
          room: user.room,
        });
      });

      socket.on("typing", () => {
        socket.broadcast.emit("typing", { user: socket.username });
      });

      socket.on("disconnect", () => {
        const user = utils.userLeave(socket.id);

        if (user) {
          io.to(user.room).emit("message", {
            msg: `${user.username} has left this chat room &#x1F625;`,
            user: "Server",
          });
          io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: utils.getRoomUsers(user.room),
          });
        }
      });
    });
  },
};
