const crypto = require('crypto');

var Poll = function(pollParams) {
  this.id          = this.generateId(10);
  this.question    = pollParams.question;
  this.adminUrl    = this.generateId(10);
  this.pollUrl     = this.generateId(10);
  this.options     = pollParams.options;
  this.votes       = this.setDefaultVotes();
  this.respondants = {};
  this.publicView  = pollParams.visible;
};

Poll.prototype = {
  generateId: function(count) {
    return crypto.randomBytes(count).toString('hex');
  },

  setDefaultVotes: function() {
    this.votes = {};
    for (key in this.options) {
      var value = this.options[key];
      this.votes[value] = 0;
    }
    return this.votes
  }
};

module.exports = Poll;