const assert   = require('assert');
const app      = require('../server');
const request  = require('request');
const fixtures = require('./fixtures');

describe('Server', () => {

  before(done => {
    this.port   = 9876;

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {

    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a body with the name of the application', (done) => {
      var title = app.locals.title;

      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(title),
          `"${response.body}" does not include "${title}".`);
        done();
      });
    });

  });

  describe('POST /', () => {

    beforeEach(() => {
      app.locals.responses = {};
    });

    it('should not return 404', (done) => {
      this.request.post('/', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should receive data and redirect the user', (done) => {
      var payload = { poll: fixtures.validPoll };

      this.request.post('/', { form: payload }, (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 302);
        done();
      });
    });
  });

});