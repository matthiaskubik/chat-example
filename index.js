var app = require('express')();
var cfenv = require('cfenv');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var appEnv = cfenv.getAppEnv();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(appEnv.port, function(){
  console.log('listening on *: ' + appEnv.port);
});
