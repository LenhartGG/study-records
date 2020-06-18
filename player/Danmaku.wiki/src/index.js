var danmaku = new Danmaku();
danmaku.init({
  container: document.getElementById('my-container')
});
var socket = io('10.243.28.45:80');
socket.on('danmaku', function(comment) {
  danmaku.emit(comment)
});
var btn = document.getElementById('send-button');
btn.addEventListener('click', function() {
  var comment = {
    text: 'bla bla',
    style: {
      fontSize: '20px',
      color: '#ffffff'
    },
  };
  danmaku.emit(comment);
  socket.emit('danmaku', comment);
});