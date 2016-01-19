const chai = require('chai');
const assert = chai.assert;

const Database = require('../lib/database');
const Poll = require('../lib/poll');
const fixtures = require('./fixtures');

describe('databases', function () {
  beforeEach(function() {
    this.database = new Database();
  });

  it('should instatiate a new database', function () {
    var database = new Database;
    assert.isObject(database);
  });

  it('should create a poll', function () {
    var database = new Database;
    database.createPoll({ poll: fixtures.validPoll });
    assert.equal(Object.keys(database).length, 1);
  });

  it('should find a poll', function () {
    var database = new Database;
    var poll = database.createPoll({ poll: fixtures.validPoll });
    var found = database.findPoll(poll.adminUrl);
    assert.equal(found.adminUrl, poll.adminUrl);
  });

  it('should find a user poll', function () {
    var database = new Database;
    var poll = database.createPoll({ poll: fixtures.validPoll });
    var found = database.findUserPoll(poll.pollUrl);
    assert.equal(found.pollUrl, poll.pollUrl);
  });

  it('should add a vote', function () {
    var database = new Database;
    var poll = new Poll(fixtures.validPoll);

    assert.equal(poll.votes['mushrooms'], 0);

    database.polls[poll.adminUrl] = poll
    database.addVote(poll.pollUrl, 'mushrooms' );
    var found = database.findUserPoll(poll.pollUrl);

    assert.equal(found.votes['mushrooms'], 1);
  });
});