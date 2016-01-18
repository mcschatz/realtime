const http       = require('http');
const express    = require('express');
const app        = express();
const port       = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const Database   = require('./lib/database');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/admin/:id', function(request, response) {
  response.render('admin')
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