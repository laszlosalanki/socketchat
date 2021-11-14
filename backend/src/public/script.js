const socket = io(window.location.host, {
  auth: {
    token: window.sessionStorage.getItem('token'),
  },
  cors: {
    origin: window.location.host,
    methods: ['GET', 'POST'],
  },
});
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const userContainer = document.getElementById('users-container');

//const name = prompt('What is your name?')
appendMessage('You joined');
socket.emit('new-user', name);
socket.emit('list_users');

socket.on('message', (data) => {
  appendMessage(`${data.from}: ${data.data}`);
});

socket.on('user-connected', (name) => {
  appendMessage(`${name} connected`);
  appendUser(name);
});

socket.on('user-disconnected', (name) => {
  appendMessage(`${name} disconnected`);
  deleteUser(name);
});

socket.on('list_users', (users) => {
  users.map((user) => appendUser(user));
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('message', message);
  console.log(socket);
  messageInput.value = '';
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

function appendUser(user) {
  const userElement = document.createElement('div');
  userElement.setAttribute('id', user);
  userElement.innerText = user;
  userContainer.append(userElement);
}

function deleteUser(user) {
  const userElement = document.getElementById(user);
  userContainer.removeChild(userElement);
}
