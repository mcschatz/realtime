const chai = require('chai');
const assert = chai.assert;

const Poll = require('../lib/poll');
const fixtures = require('./fixtures');

describe('polls', function () {
  it('should instatiate a new poll', function () {
    var poll = new Poll(fixtures.validPoll);
    assert.isObject(poll);
  });

  it('should have options', function () {
    var poll = new Poll(fixtures.validPoll);
    assert.equal(poll.options[0], 'mushrooms');
  });

  it('should have a question', function () {
    var poll = new Poll(fixtures.validPoll);
    assert.equal(poll.question, 'What toppings do you want?');
  });

  it('should have an adminUrl', function () {
    var poll = new Poll(fixtures.validPoll);
    assert.equal(poll.adminUrl.length, 20);
  });

  it('should have a pollUrl', function () {
    var poll = new Poll(fixtures.validPoll);
    assert.equal(poll.pollUrl.length, 20);
  });

  it('should have votes', function () {
    var poll = new Poll(fixtures.validPoll);
    assert.equal(poll.votes['black olives'], 0);
  });

  it('should have a view status', function () {
    var poll = new Poll(fixtures.validPoll);
    assert.equal(poll.publicView, undefined);
  });

  it('should have status', function () {
    var poll = new Poll(fixtures.validPoll);
    assert.equal(poll.status, 'Open');
  });

  it('should have a setTimeout', function () {
    var poll = new Poll(fixtures.validPoll);
    assert.equal(poll.setTimeout, 300000000);
  });
});