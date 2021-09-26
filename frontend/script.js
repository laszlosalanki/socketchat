const socket = io('http://localhost:3000', {
  auth: {
        token: window.sessionStorage.getItem("token")
      },
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
})
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

//const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('message', data => {
    appendMessage(`${data.from}: ${data.data}`)
  })

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
  })

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
  })

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('message', message)
  console.log(socket)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
