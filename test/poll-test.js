const chai = require('chai');
const assert = chai.assert;

const Poll = require('../lib/poll');
const fixtures = require('./fixtures');

describe('polls', function () {
  it('should instatiate a new poll', function () {
    var poll = fixtures.validPoll;
    assert.isObject(poll);
  });

  // it('should be associated with a game', function () {
  //   let poll = new Poll(this.game, {x: 100, y: 50} );
  //   assert.equal(poll.game, this.game);
  // });

  // it('should have a position consisting of an x cord', function () {
  //   let poll = new Poll(this.game, {x: 100, y: 50} );
  //   assert.equal(poll.position.x, 100);
  // });

  // it('should have a position consisting of an y cord', function () {
  //   let poll = new Poll(this.game, {x: 100, y: 50} );
  //   assert.equal(poll.position.y, 50);
  // });

  // it('should have status of defaulting to one', function () {
  //   let poll = new Poll(this.game, {x: 100, y: 50} );
  //   assert.equal(poll.status, 1);
  // });

  // it('should have draw method', function () {
  //   let poll = new Poll(this.game, {x: 100, y: 50} );
  //   assert.ok(poll.draw);
  // });
});