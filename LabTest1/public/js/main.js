const roomName = $("#room-name");
const userList = $("#userList");
const messageBox = $("#messageBox");
const msgFrom = $("#msgFrom");
const msgInput = $("#msg");
const typingMsg = $("#typingMsg");
// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit("joinChat", { username, room });

// receive room with list of users
socket.on("roomUsers", ({ room, users, prevMsg }) => {
  // output room name
  roomName.text(room);

  // list up users registered to the chat room
  userList.text("");
  users.forEach(({ id, username }) => {
    userList.append(
      `<li class="p-2 rounded shadow mb-2 font-bold"> ${username} - ID: ${id}</li>`
    );
  });
});

// receive message from a server
socket.on("message", (data) => {
  typingMsg.empty();
  outputMessage(data);
});

// typing ...
msgInput.bind("keypress", () => {
  socket.emit("typing");
});

socket.on("typing", (data) => {
  console.log(data);
  typingMsg.html(
    `<p class="text-gray-600"><span class="font-bold">${data.user}</span> is typing a message...</p>`
  );
});

// send message to a server
msgFrom.submit((e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM
const outputMessage = async ({ msg, user }) => {
  let msgTag = $(`<li class="flex item-center bg-transparent-200 mb-2">
                    <span class="bg-black p-3 w-1/6">
                      <span class="font-bold text-white">${user}</span>
                    </span>
                    <span class="ml-3 w-5/6">${msg}</span>
                  </li>`);
  $(msgTag).appendTo(messageBox);
};
