# Game Time

Let's start by cloning down the starter kit.

```
git@github.com:turingschool-examples/game-time-starter-kit.git
```

Next, we'll run `npm install` to install our dependencies.

## Setting Up Some Initial Objects

The first thing that I know I'm going to need is some sort of data structure for storing the coordinates of a given point. Normally, this might just be a simple object with an `x` property and a `y` property. But, I'm likely going to be doing some collision detection and other fun stuff. I'm going to take a page out of Cocoa's book. Cocoa has a `CGPoint` struct for dealing with a one-dimensional point. We'll create a `Point` class that will serve a similar role. The advantage here is that we can some convenience methods to our `Point` class that will make it easier later on down the road.

### Point

Let's start by adding two files to our project.

```
touch ./lib/point.js
touch ./test/point-test.js
```

Next, we'll get our tests wired up in `test/index.js` by replacing the contents with the following.

```js
require('./point-test.js');
```

Let's fire up our server with `npm start` and head over to `http://localhost:8080/webpack-dev-server/test.html` in order to run our test suite. When we visit this page, we should see a whole lot of nothing—aside from some statistics about our test suite in the upper-right corner.

The basic setup of our tests will look as follows. I recommend setting up some snippets in your editor for the `describe` and `it` blocks. You might also notice that I'm using ES6 module syntax. As I said early on in the module, I'm going to try to introduce ES6 features slowly instead of showing you them all at once. The module syntax will be the first of a few features that we'll meet in this tutorial. This works because we have Babel installed as part of our Webpack configuration.

Let's start with a basic test that will verify that we can require everything and that our test suite even works.

```js
import Point from '../lib/point';
import { assert } from 'chai';

describe('Point', () => {

  it('should exist', () => {
    assert(Point);
  });

});
```

You'll notice in the second line that we can pull the `assert` method right out of the Chai library. If we were using the Node-style way of requiring files, you'd see something like this:

```js
const chai = require('chai');
const assert = chai.assert;

// Or, alternatively…

const assert = require('chai').assert;
```

The next thing to do is to verify that we can instantiate is a new Point.

Whoops. If we take a look at our test, we'll see that we get a `TypeError` because `Point` is not a constructor. This makes sense, really, because `Point` is an empty file. Files export an empty object unless we step in and announce otherwise. Let's add a basic class definition to `lib/point.js`.

```js
class Point {
  constructor() {

  }
}

export default Point;
```

You'll notice that we export the `Point` class using a slightly different syntax than we have been previously. It's synonomous with `module.exports = Point`.

Alright, let's get some basic properties going here. We know that a `Point` is likely to have an `x` and `y` property. So, let's test that we can pass those in and they'll be set as properties. Let's set up some tests in `test/point-test.js`.

```js
it('should have an "x" property', () => {
  let point = new Point(1, 2);
  assert.equal(point.x, 1);
});

it('should have an "y" property', () => {
  let point = new Point(1, 2);
  assert.equal(point.y, 2);
});
```

Updating our implementation in `lib/point.js` to make these tests pass is pretty straight-forward.

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default Point;
```

We'll also set up a few methods. The first is for our own debugging sanity. It's likely that we'll want to use `console.log` at some point when debugging. So, I'm going to add a `toString()` method to the point class.

As usual, let's add a test in `test/point-test.js`:

```js
it('should have a string representation', () => {
  let point = new Point(1, 2);
  assert.equal(point.toString(), '(1,2)');
});
```

And then we'll add an implementation in `lib/point.js`:

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x},${this.y})`;
  }
}

export default Point;
```

This approach is similar to adding a function to `Point.prototype.toString` in ES5 and earlier. Let's take a look at our tests and verify that they pass.

Looking ahead, I suspect I'm going to want one more method: some kind of way to check if two points are equal. All objects are implcility not equal because they have different addresses in memory. As a result, I won't be able to use `===` out of the box. I'll give myself an `equals` method on `Point.prototype` in order to see if two points have the same `x` and `y` properties.

Nest inside my `describe` block for `Point` in `test/point-test.js`, I'll place another `describe` block with the following tests:

```js
describe('#equals', () => {

  it('should return false if two points do no overlap', () => {
    let first = new Point(1, 1);
    let second = new Point(2, 2);
    assert.isFalse(first.equals(second));
  });

  it('should return true if two points do no overlap', () => {
    let first = new Point(1, 1);
    let second = new Point(1, 1);
    assert.isTrue(first.equals(second));
  });

});
```

I'll also update our implementation in `/lib/point.js` a follows:

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(point) {
    return this.x === point.x &&
           this.y === point.y
  }

  toString() {
    return `(${this.x},${this.y})`;
  }
}

export default Point;
```

I want to give myself one final little niciety: default values for a new point class. I'll add some additional tests right before that nested `describe` block I added a few minutes ago.

My test looks is pretty straight-foward.

```js
it('should have default values of (0,0)', () => {
  let point = new Point();
  assert.equal(point.x, 0);
  assert.equal(point.y, 0);
});
```

My implementation in `lib/point.js` is even simpler.

```js
class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // More methods below…
}
```

This seems like a good time to make a commit.
