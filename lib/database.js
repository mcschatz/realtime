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
  },

  findUserPoll: function(id) {
    var polls = Object.keys(this.polls);
    var id = polls.filter(function(poll) {
      return String(this.polls[poll].pollUrl) === id;
    }.bind(this));
    return this.polls[id];
  },

  addVote: function(pollUrl, vote) {
    var poll = this.findUserPoll(pollUrl);
    if (poll.votes[vote]) {
      poll.votes[vote] += 1;
    } else {
      poll.votes[vote] = 1;
    }
  }
}

module.exports = Database;