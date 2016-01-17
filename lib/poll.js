const crypto = require('crypto');

var Poll = function(params) {

  this.id          = this.generateId(10);
  this.question    = params.question;
  this.adminUrl    = this.generateId(10);
  this.pollUrl     = this.generateId(10);
  this.answers     = params.answers;
  this.responses   = {};
  this.respondants = {};
};

Poll.prototype = {
  generateId: function(count) {
    return crypto.randomBytes(count).toString('hex');
  }
};

module.exports = Poll;