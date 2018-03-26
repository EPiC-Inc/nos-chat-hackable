var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

if (process.argv[2] == undefined) {
  var port = 80;
} else {
  var port = process.argv[2]; // Use node server.js <port>
}

app.get('/', function(req, res){
res.sendFile(__dirname + '/static/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(port, function(){
  console.log('Listening on port:'+port);
});
