const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const port = 3000;

io.on("connection", (socket) => {
  let room;
  const roomId = socket.handshake.query.id;

  room = parseInt(roomId);
  console.log("Connection established!", room);

  socket.join(room);
  io.to(room).emit("receive-notification");

  socket.on("send-message", function (req) {
    console.log(req.recipient, req.message);
    io.sockets.in(req.recipient).emit("receive-message", req.message);
    io.sockets.in(req.recipient).emit("receive-conversation", req.sender);
    console.log(`Message for ${req.recipient}: ${req.message}`);
  });

  socket.on("send-notification", function (req) {
    console.log(req);
    io.sockets.in(req.recipient).emit("receive-notification", req);

    console.log(`${req.recipient} notifications updated!`);
  });

  socket.on("send-notification-all", function () {
    io.sockets.emit("receive-notification");
  });

  socket.on("mark-as-seen-conversation", function (user, id) {
    io.sockets.in(user).emit("is-seen-conversation", id);

    console.log(`${user} has read the conversation`);
  });

  socket.on("update-account", function (req) {
    io.sockets.in(req.sessionId).emit("receive-account-update", req);
  });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
