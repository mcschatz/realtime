const Poll = require('./poll');

function Database() {
  this.polls = {};
}

Database.prototype = {
  createPoll: function(pollParams) {
    var poll = new Poll(pollParams);
    this.polls[poll.adminUrl] = poll;
    return poll;
  },

  findPoll: function(id) {
    return this.polls[id];
  }
}

module.exports = Database;