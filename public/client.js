var adminPollId = window.location.pathname.match(/\/admin\/(.*)/);

if (adminPollId) {
  var socket = io({ query: 'adminPollId=' + adminPollId[1] });
  socket.on('vote', function (data) {
    var $vote = $('.admin-results ul li').filter(function () {
      return $(this).data('key') === data
    })
    var voteCount = Number($vote.find('.tally').text());
    voteCount += 1;
    $vote.find('.tally').text(voteCount);
  });
}

$('.option').on('click', function() {
  var pollId = window.location.pathname.match(/\/poll\/(.*)/)[1];
  $.ajax({
    url: '/poll/' + pollId + '/vote',
    method: 'POST',
    data: { vote: $(this).text() }
  });
});

