var express = require('express');
var path = require('path');
var compression = require('compression');
var app = express();
var cors = require("cors");
app.use (cors ({source: '/'}))
app.use(express.static('public'));
app.use(compression());
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
var http = require('http').Server(app);
var io = require('socket.io')(http);

  io.on('connection', (socket) => {
  socket.on('msg', (data) => {
      socket.broadcast.emit('newmsg', data);
  })
   socket.on('removeMsg', (data) => {
      socket.broadcast.emit('noteMsg', data);
  })
  socket.on('editMsg', (data) => {
      socket.broadcast.emit('editedMsg', data);
  })
   socket.on('typing', (data) => {
      socket.broadcast.emit('typingMsg');
  })
     socket.on('stopTyping', (data) => {
      socket.broadcast.emit('stopTypingMsg');
  })
})


// Start server
http.listen(process.env.PORT || 8088);