const express = require("express");
const socket = require("socket.io");

const app = express();
var server = app.listen(4000, () => {
  console.log("Server live on port 4000");
});

//static files
app.use(express.static("./public"));

//socket setup
var io = socket(server); //inititailsing function --> on this server

io.on("connection", (socket) => {
  //each connection will have its socket param
  console.log("connection made");

  socket.on("chat", (data) => {
    //"chat" event is defined on the client
    io.sockets.emit("chat", data); //emitting to all connected clients(sockets)
  });

  socket.on("typing", (data) => {
    console.log(data);
    socket.broadcast.emit("typing", data); //broadcast
  });
});

//server emitting vs broadcasting
//braodcasting is same as emitting except emitting also sends to initial original sender of the vent
