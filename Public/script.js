// Connect to the Socket.IO server
const socket = io();

let username = '';

// Select DOM elements
const usernameForm = document.getElementById('username-form');
const usernameInput = document.getElementById('username-input');
const chatForm = document.getElementById('chat-form');
const msgInput = document.getElementById('msg-input');
const chatBox = document.getElementById('chat-box');
const chatSection = document.getElementById('chat-section');

// Handle username form submission
usernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Set username and show chat section
    username = usernameInput.value;
    usernameForm.style.display = 'none';
    chatSection.style.display = 'block';
    
    // Notify the server that a user has joined
    socket.emit('joinChat', username);
});

// Handle chat form submission
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const msg = msgInput.value;
    if (msg) {
        // Send message to server along with username
        socket.emit('chatMessage', { username, msg });
        msgInput.value = ''; // Clear input field
    }
});

// Display incoming messages with username and timestamp
socket.on('chatMessage', (data) => {
    const msgElement = document.createElement('p');
    
    // Get current time
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    msgElement.innerHTML = `<strong>${data.username}:</strong> ${data.msg} <span style="font-size:0.8em; color:grey;">(${time})</span>`;
    chatBox.appendChild(msgElement);
});

// Display user join notification
socket.on('userJoined', (user) => {
    const joinElement = document.createElement('p');
    joinElement.innerHTML = `<em>${user} joined the chat</em>`;
    chatBox.appendChild(joinElement);
});
