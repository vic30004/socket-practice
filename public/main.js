const message = document.querySelector(".message");
const inputMessage = document.querySelector(".inputMessage");
const form = document.querySelector("#chat");
const usernameForm = document.querySelector("#usernameForm");
const login = document.querySelector("#username");
const chatArea = document.querySelector("#chatArea");
const chatBox = document.querySelector("#chatBox");
const socket = io();

let connected = false;

const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.on("message", (message) => {
  addMessage(message);
  chatBox.scrollTop = chatBox.scrollHeight;
});
socket.on("automated message", (message) => {
  automatedMessage(message);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let userMessage = inputMessage.value.trim();
  let obj = {
    username,
    userMessage,
  };
  socket.emit("chatMessage", obj);
  inputMessage.value = "";
});

function addMessage(info) {
  const li = document.createElement("li");
  li.classList = "py-2 bg-gray-200 px-2 rounded text-blue-400 font-medium my-2";
  li.innerHTML = `<span>${info.username} ${info.time}</span>  
  <p>${info.message}</p>
  `;
  message.appendChild(li);
}

function automatedMessage(msg) {
  if (!msg) {
    return;
  }
  const li = document.createElement("li");
  li.innerHTML = `<span>${msg.username} ${msg.time}</span> <p>${msg.message}</p>`;
  message.appendChild(li);
}

socket.on("new message", (data) => {
  addMessage(data.message);
});
