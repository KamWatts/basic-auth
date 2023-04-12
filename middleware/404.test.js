const clientError = require('./clientError'); // assuming the code is in a file called clientError.js
const serverError = require('./serverError');

describe('clientError middleware', () => {
  it('should return a 404 status code', () => {
    const req = {};
    const res = {
      statusCode: 0,
      status(code) {
        this.statusCode = code;
        return this;
      },
      send() {}
    };

    clientError(req, res);

    expect(res.statusCode).toBe(404);
  });

  it('should send the correct message', () => {
    const req = {};
    const res = {
      statusCode: 0,
      status(code) {
        this.statusCode = code;
        return this;
      },
      send(msg) {
        this._data = msg;
      },
      _data: ''
    };

    clientError(req, res);

    expect(res._data).toBe('Not found');
  });
});

describe('serverError middleware', () => {
  it('should return a 500 status code', () => {
    const req = {};
    const res = {
      statusCode: 0,
      status(code) {
        this.statusCode = code;
        return this;
      },
      send() {}
    };

    serverError(new Error(), req, res);

    expect(res.statusCode).toBe(500);
  });

  it('should send the correct message', () => {
    const req = {};
    const res = {
      statusCode: 0,
      status(code) {
        this.statusCode = code;
        return this;
      },
      send(msg) {
        this._data = msg;
      },
      _data: ''
    };

    serverError(new Error('Internal Server Error'), req, res);

    expect(res._data).toBe('Internal Server Error');
  });
});
