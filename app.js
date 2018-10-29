const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let connectedCount = 0;

app.use(express.static('public/'));

io.on('connect', (socket) => {
    console.log('a user connected');
    ++connectedCount;
    socket.emit('message', 'socket connected');
    io.sockets.emit('connectedCount', connectedCount);

    socket.on('message', (msg) => {
        console.log('someone clicked play, msg: '+msg);
        socket.broadcast.emit('play', msg);
    });

    socket.on('disconnect', () => {
        --connectedCount;
        console.log('user disconnected');
    })
});

http.listen(3001, () => {
    console.log('listening on *:3001');
});