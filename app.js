let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

/*app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});*/

app.use(express.static('public/'));

io.on('connect', function(socket) {
    console.log('a user connected');
    socket.emit('message', 'socket connected');

    socket.on('message', function(msg) {
        console.log('someone clicked play, msg: '+msg);
        socket.broadcast.emit('play', msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    })
});

http.listen(3001, function() {
    console.log('listening on *:3001');
});