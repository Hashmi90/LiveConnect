// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from 'public' folder
app.use(express.static(__dirname + '/public'));

// Handle socket connection
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle user joining the chat
    socket.on('joinChat', (username) => {
        io.emit('userJoined', username); // Broadcast to all users
    });

    // Handle incoming chat messages
    socket.on('chatMessage', (data) => {
        io.emit('chatMessage', data); // Broadcast message to everyone
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
