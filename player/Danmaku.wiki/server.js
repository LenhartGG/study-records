const app = require('http').createServer(handler);
const io = require('socket.io')(app);
app.listen(80);
function handler (req, res) {
  // your handler...
}
io.on('connection', socket => {
  socket.on('danmaku', comment => {
    socket.broadcast.emit('danmaku', comment);
  });
});