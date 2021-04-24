//make connection
//frontend

var socket = io.connect("http://localhost:4000", { reconnect: true }); //will create a connection and trigger event listener on server

//query  DOM
var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output");
feedback = document.getElementById("feedback");

///emit events

btn.addEventListener("click", () => {
  socket.emit("chat", {
    //data to be emitted under 'chat'
    message: message.value,
    handle: handle.value,
  });
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

//listen for events launched from the server
socket.on("chat", (data) => {
  //event name must be same
  output.innerHTML +=
    `<p><strong>` + data.handle + `:</strong>` + data.message + `</p>`;
});
socket.on("typing", (data) => {
  console.log("received");
  feedback.innerHTML = `<p><em>` + data + `is typing </em></p>`;
});
