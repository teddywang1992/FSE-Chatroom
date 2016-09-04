var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Routing
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/login.html');
});

app.get('/chat', function(req, res){
  res.send('awef');
});
//Port
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('user joined', function(user){
    socket.user = user;
  });

  socket.on('new message', function(msg){
    socket.broadcast.emit('msg', msg);
    // mysql.save({user: socket.user, msg: msg});
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
