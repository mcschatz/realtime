var adminPollId = window.location.pathname.match(/\/admin\/(.*)/);
var userPollId = window.location.pathname.match(/\/poll\/(.*)/);
var addOption = document.getElementById('add-option');

if (adminPollId) {
  var socket = io({ query: 'adminPollId=' + adminPollId[1] });
  socket.on('vote', function (data) {
    var $vote = $('.results-admin ul li').filter(function () {
      return $(this).data('key') === data
    })
    var voteCount = Number($vote.find('.tally').text());
    voteCount += 1;
    $vote.find('.tally').text(voteCount);
  });
}

if (userPollId) {
  var socket = io({ query: 'userPollId=' + userPollId[1] });
  socket.on('vote', function (data) {
    var $vote = $('.results ul li').filter(function () {
      return $(this).data('key') === data
    })
    var voteCount = Number($vote.find('.tally').text());
    voteCount += 1;
    $vote.find('.tally').text(voteCount);
  });
}

if (addOption) {
  addOption.addEventListener('click', addInput);
}

$('#close').on('click', function() {
  var socket = io();//
  socket.send('closed-poll', this.value);
});

function addInput(event) {
  event.preventDefault();
  var newInput = document.createElement('div');
  newInput.innerHTML = `<input id='poll-option' type='text' placeholder='Response Option' name="poll[options]">`;
  $('.poll-options').append(newInput);
}

$('.option').on('click', function() {
  var pollId = window.location.pathname.match(/\/poll\/(.*)/)[1];
  $.ajax({
    url: '/poll/' + pollId + '/vote',
    method: 'POST',
    data: { vote: $(this).text() }
  });
});