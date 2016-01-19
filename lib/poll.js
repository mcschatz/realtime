const crypto = require('crypto');

var Poll = function(pollParams) {
  this.id          = this.generateId(10);
  this.question    = pollParams.question;
  this.adminUrl    = this.generateId(10);
  this.pollUrl     = this.generateId(10);
  this.options     = pollParams.options;
  this.votes       = {};
  this.respondants = {};
  this.publicView  = pollParams.visible;
};

Poll.prototype = {
  generateId: function(count) {
    return crypto.randomBytes(count).toString('hex');
  }
};

module.exports = Poll;