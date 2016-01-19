const crypto = require('crypto');

var Poll = function(pollParams) {
  this.question    = pollParams.question;
  this.adminUrl    = this.generateId(10);
  this.pollUrl     = this.generateId(10);
  this.options     = pollParams.options;
  this.votes       = this.setDefaultVotes();
  this.publicView  = pollParams.visible;
  this.status      = "Open";
  this.setTimeout  = this.setTime(pollParams.setTimeout);
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
  },

  setTime: function (params) {
    var time = (params*60*1000);
    var self = this
    setTimeout(function(){
      self.status = "Closed";
    }, time)  ;
    return time
  }
};

module.exports = Poll;