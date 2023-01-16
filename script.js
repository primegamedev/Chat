const socket = io('http://localhost:3000')
const messageCont = document.getElementById('message-container')
const form = document.getElementById('send-container')
const input = document.getElementById('message-input')

let userName = prompt('What is ur userName')
if(userName === ''){
    userName = `anonymous${Math.round(Math.random()* 9999)}`
    alert(userName)
}
appendMessage("You Joined")
socket.emit('new-user', userName)

socket.on('chat-message', data => {
    appendMessage(`${data.userName}: ${data.message}`)
})

socket.on('user-connected', userName => {
    appendMessage(`${userName} connected`)
})

socket.on('user-disconnected', userName => {
    appendMessage(`${userName} disconnected`)
})

form.addEventListener('submit', e => {
    e.preventDefault()
    const message = input.value
    appendMessage(`You: ${message}`)
    socket.emit('scm', message)
    input.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageCont.append(messageElement)
}