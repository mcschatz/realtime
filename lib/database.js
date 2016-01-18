const Poll = require('./poll');

function Database() {
  this.polls = {};
}

Database.prototype = {
  createPoll: function(pollParams) {
    var poll = new Poll(pollParams);
    this.polls[poll.adminId] = poll;
    return poll;
  }
}

module.exports = Database;