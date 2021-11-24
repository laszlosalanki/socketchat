const socket = io(window.location.host, {
  auth: {
    token: window.sessionStorage.getItem('token'),
  },
  cors: {
    origin: window.location.host,
    methods: ['GET', 'POST'],
  },
});

const chatForm = document.getElementById('chat-form');
const roomNameDiv = document.getElementById('room-name');
const roomLangDiv = document.getElementById('room-language');
const messageInput = document.getElementById('msg');
const chatMessages = document.querySelector('.chat-messages');

// Getting roomname from URL
roomNameAppender();

// Generating greeting text
botMessageGenerator('Welcome to SocketChat!');

socket.on('message', (data) => {
  appendMessage(data);

  // Scrolling down on new message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('user-connected', (data) => {
  appendMessage(data);
  appendUser(data.data.split(' ')[0]);
  console.log('konnektnel');
});

socket.on('user-disconnected', (data) => {
  appendMessage(data);
  deleteUser(data.data.split(' ')[0]);

});

socket.on('delete-room', () => {
  window.location.href = 'join.html';
});

socket.on('load-room-data', (roomData) => {
  roomNameAppender(roomData.name,roomData.default_language);
  roomData.messages.map((message) => {
    appendMessage({
      from: message.created_by,
      data: message.content,
      time: new Date(message.created_at).toLocaleString(),
    })
  }
  );
});

socket.on('list-users', (users) => {
  users.map((user) => appendUser(user));
  console.log('listusernel');
});

//Submiting messages
// az uzenet iroja szoveget csak itt lehet megjeleniteni
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = messageInput.value;

  // appending message on html
  socket.emit('message', message);

  //appendMessage(outputMessage); //innen irodik ki a kuldo szovege.*/
  chatMessages.scrollTop = chatMessages.scrollHeight;
  messageInput.value = '';
  messageInput.focus();
});

window.addEventListener('load', () => {
  joinRoomOnLoad();
});

document.getElementById('delete-room').addEventListener('click', () => {
  socket.emit('delete-room', (response) => {
    if (response.data.error) {
      alert(response.data.error.message);
    }
  });
});

function joinRoomOnLoad() {
  const searchParams = new URLSearchParams(window.location.search);

  const roomName = searchParams.get('room-name');

  if (!roomName) {
    return; // do not create the room
  }

  joinRoom(roomName);
  // window.location.search = '';
}

function appendMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.from} <span>${message.time}</span></p>
    <p class="text">
        ${message.data}
    </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

function appendUser(user) {
  const li = document.createElement('li');
  li.setAttribute('id', user);
  li.innerText = user;
  document.getElementById('users').appendChild(li);
}

function deleteUser(user) {
  const userElement = document.getElementById(user);
  document.getElementById('users').removeChild(userElement);
}

function timeGenerator() {
  const currentdate = new Date();
  if (currentdate.getMinutes() > 9) {
    return currentdate.getHours() + ':' + currentdate.getMinutes();
  } else {
    return currentdate.getHours() + ':' + '0' + currentdate.getMinutes();
  }
}

function botMessageGenerator(message) {
  const botName = 'SocketChat Bot';

  const botMessage = {
    from: botName,
    data: message,
    time: timeGenerator(),
  };

  appendMessage(botMessage);
}

function roomNameAppender(roomName, roomLanguage) {
  var url_string = window.location;
  var url = new URL(url_string);
  roomNameDiv.innerHTML = roomName;
  roomLangDiv.innerHTML = roomLanguage;
}



function joinRoom(roomName) {
  socket.emit('join-room', { roomName });
}

