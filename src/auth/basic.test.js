'use strict'

const basic = require('./middleware/basic');
const base64 = require('./base-64');
const bcrypt = require('bcrypt')



describe('Testing the basic auth middleware', () => {

  test('Should send a basic header', async() => {

    const login  = {
      username: 'username',
      password: 'password'
    }

    const request = {
      headers: {
        authorization: `User ${login}`
      } };
      const response = {
        send: jest.fn(() => response),
        status: jest.fn(() => response)
      };

      const nextFunction = jest.fn();
      await validate(request, response, nextFunction);

      expect(response.status).toHaveBeenCalledWith(403);
  })

  test('Request contains all the proper credentials, expect next to be caled', async () => {
    const encodedMessage = base64.encode('username:password');
    
    const request = {
      headers: {
        authorization: `Basic ${encodedMessage}`
      }
    };
    await validate(request, response, next);
    const next = jest.fn();  
  });
  
  
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