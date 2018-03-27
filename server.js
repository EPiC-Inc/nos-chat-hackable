var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var url = require('url'); 

var users = {};

if (process.argv[2] == undefined) {
  var port = 80;
} else {
  var port = process.argv[2]; // Use node server.js <port>
}

// Routing
app.use('/static', express.static(__dirname + '/static'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/static/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    var rooms = io.sockets.manager.roomClients[socket.id];
    for (var room in rooms) {
      if (room.length > 0) { // if not the global room ''
          room = room.substr(1); // remove leading '/'
          server.sockets.in(room).emit('User ['+users[socket.id]+'] has left');
      }
    }
    delete users[socket.id];
  });
  socket.on('switch', function(data){
    console.log('user switched');
    socket.join(data[0]);
    io.to(data[0]).emit('message', 'User ['+data[1]+'] has joined')
    users[socket.id] = data[1];
  });
  socket.on('message', function(data) {
    io.to(data['room']).emit('message', data['data']);
    console.log('data');
  });
});

http.listen(port, function(){
  console.log('Listening on port:'+port);
});
