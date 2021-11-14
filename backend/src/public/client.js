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
const messageInput = document.getElementById('msg');
const chatMessages = document.querySelector('.chat-messages');

// Getting roomname from URL
var roomName = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
roomName = roomName.room;

socket.emit('joinRoom', { roomName }); //server oldalon kell feldolgozni a szoba nevet

botMessageGenerator('Welcome to SocketChat!');

socket.on('message', (data) => {
  appendMessage(data);
  console.log(data);

  // Scrolling down on new message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('user-connected', (data) => {
  appendMessage(data);
});

socket.on('user-disconnected', (data) => {
  appendMessage(data);
});

//Submiting messages
// az uzenet iroja szoveget csak itt lehet megjeleniteni
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = messageInput.value;

  // appending message on html
  socket.emit('message', message);
  var outputMessage = {
    from: 'You',
    data: message,
    time: timeGenerator(),
  };

  appendMessage(outputMessage); //innen irodik ki a kuldo szovege.
  chatMessages.scrollTop = chatMessages.scrollHeight;
  messageInput.value = '';
  messageInput.focus();
});

function appendMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.from} <span>${message.time}</span></p>
    <p class="text">
        ${message.data}
    </p>`;
  document.querySelector('.chat-messages').appendChild(div);
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
