const http    = require('http');
const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;

app.use(express.static('public'));

app.locals.title = 'Real Time';

app.locals.responses = {};

app.set('view engine', 'jade');

app.get('/', function (req, res){
  res.render('index');
});

app.post('/responses', (request, response) => {
  response.sendStatus(201);
});

const server = http.createServer(app)

if(!module.parent) {
  server.listen(port, () => {
    console.log(`${app.locals.title} is running on port ${port}.`);
  });
}

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

module.exports = app;