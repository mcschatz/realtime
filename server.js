const http       = require('http');
const express    = require('express');
const app        = express();
const server     = http.createServer(app)
const port       = process.env.PORT || 3000;
const path       = require('path');
const bodyParser = require('body-parser');
const Database   = require('./lib/database');
const socketIo   = require('socket.io');
const io         = socketIo(server);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'Real Time';

app.set('view engine', 'jade');

var database = new Database

app.get('/', function (req, res){
  res.render('index');
});

app.post('/', function (req, res) {
  if (!req.body.poll) { return res.sendStatus(400); }
  var poll = database.createPoll(req.body.poll);
  res.redirect('/admin/' + poll.adminUrl);
});

app.get('/admin/:id', function (req, res) {
  var poll = database.findPoll(res.req.params.id);
  res.render('admin', { poll: poll });
});

app.get('/poll/:id', function (req, res) {
  var poll = database.findUserPoll(req.params.id);
  res.render('poll', { poll: poll });
});

app.post('/poll/:id/vote', function(req, res) {
  database.addVote(req.params.id, req.body.vote);
  var admin = database.findUserPoll(req.params.id).adminUrl;
  var user = database.findUserPoll(req.params.id).pollUrl;
  io.to(admin).emit('vote', req.body.vote);
  io.to(user).emit('vote', req.body.vote);
  res.send(204);
});

if(!module.parent) {
  server.listen(port, () => {
    console.log(`${app.locals.title} is running on port ${port}.`);
  });
}

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  const adminPollId = socket.handshake.query.adminPollId;
  if (adminPollId) {
    console.log(adminPollId);
    socket.join(adminPollId);
  }

  const userPollId = socket.handshake.query.userPollId;
  if (userPollId) {
    console.log(userPollId);
    socket.join(userPollId);
  }

  socket.on('message', function (channel, message) {
    if (channel === 'closed-poll') {
      database.updateStatus(message);
      io.sockets.emit(channel, message);
    }
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

module.exports = app;