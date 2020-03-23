const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const router = require("./routes/router");

app.use(cors());
app.use("/api", router);

io.on("connect", (socket) => {
  socket.on(
    "join",
    ({ name, room },
    (callback) => {
      // const {error,user} =
    })
  );
});
