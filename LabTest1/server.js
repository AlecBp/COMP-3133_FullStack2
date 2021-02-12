const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const express = require("express");
const socket_server = require("./socket/server");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
socket_server.initiate(io);
const db_uri = "mongodb://localhost:27017/socket";

mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(`MongoDB connection FAILED`, err));
