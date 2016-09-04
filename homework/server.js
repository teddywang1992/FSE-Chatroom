var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var name = {};

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

var client = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/chat';

client.connect(url, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log("success");
  }
});

client.connect(url, function(err, db) {
  if (err) {
    console.log(err);
  }

  io.on('connection', function(socket){
    console.log('a user connected');

    var myTable = db.collection('myData');
    myTable.find().toArray(function(err, result) {
      if (err) {
          console.log(err);
      } else {
        socket.emit('msg list', result);
      }

    });

    socket.on('new message', function(msg){
      var myTable = db.collection('myData');
      myTable.insert({msg : msg}, function(err, result){
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
      io.emit('msg', msg);
    });

  });
});


http.listen(3026, function(){
  console.log('listening on *:3000');
});
