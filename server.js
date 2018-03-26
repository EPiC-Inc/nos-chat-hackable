var app = require('express')();
var http = require('http').Server(app);

if (process.argv[2] == undefined) {
  var port = 80;
} else {
  var port = process.argv[2]; // Use node server.js <port>
}

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(port, function(){
  console.log('listening on *:'+port);
});
