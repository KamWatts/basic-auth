'use strict'

const basic = require('./basic');
const base64 = require('./base-64');

describe('Testing the basic auth middleware', () => {
  test('Request contains all the proper credentials, expect next to be caled', () => {
    const encodedMessage = base64.encode('username:password');

    const request = {
      headers: {
        authorization: `Basic ${encodedMessage}`
      }
    };
  });
  
  const next = jest.fn();
  
  
  test('No credentials present, response: 403 returned', () => {
    const request = {headers: {}};
    const response = {
      send: jest.fn(),
      status: jest.fn(),
      json: jest.fn(),
    }
    const next =  jest.fn();
    basic(request, response, next);
    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.send).toHaveBeenCalledWith('Invalid login');
    });
  })