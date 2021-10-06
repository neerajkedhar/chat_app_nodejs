const socket = io()
let names;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.msg__area')
do {
    names = prompt('Enter your name to begin chatting: ')
} while(!names)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: names,
        message: message
    }
  
    appendMessage(msg, 'outgoingMsg')
    textarea.value = ''



    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


socket.on('message', (msg) => {
    appendMessage(msg, 'incomingMsg')
    
})





