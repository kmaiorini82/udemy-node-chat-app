const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    
    // Challenge
    socket.emit('newMessage', {
        from: 'admin',
        text: 'Welcome to the chat app!'
    });

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'New user joined',
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
        // Sends message to just person who opened socket
        socket.emit('newMessage', {
            text: 'New message sent'
        });

        // Sends message to everyone
        // io.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });

        // Sends message to everyone except who opened socket
        socket.broadcast.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
})