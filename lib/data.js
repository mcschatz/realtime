const Poll = require('./poll');

function dataStore() {
  this.polls = {};
}

Data.prototype = {
  createPoll: function(pollParams) {
    var poll = new Poll(pollParams)
    this.polls[poll.adminId] = poll;
    return poll;
  }
}

module.exports = data;