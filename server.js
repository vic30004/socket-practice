const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

function formatMessag(username, message) {
  const date = new Date();
  const time = date.toLocaleTimeString();

  return {
    username,
    message,
    time,
  };
}

const botName = "ChatBot";

server.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  let addUser = false;

  //   Welcome current user
  socket.emit(
    "automated message",
    formatMessag(botName, "Welcome to the chat!")
  );

  socket.on("userAdded", (username) => {
    socket.broadcast.emit(
      "automated message",
      formatMessag(botName, `${username} has joined the channel`)
    );
  });

  //  Runs when client diconnects
  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "automated message",
      formatMessag(botName, "A user has left the room")
    );
  });

  //   Listen for chat message
  socket.on("chatMessage", (message) => {
    console.log(message);
    io.emit(
      "message",
      formatMessag(message.username, `${message.userMessage}`)
    );
  });
});
