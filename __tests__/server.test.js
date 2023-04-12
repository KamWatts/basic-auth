'use strict'
const server = require('../src/auth/server');
const supertest = require('supertest');
const request = supertest(server.app);
const { sequelize } = require('../src/auth/models');

beforeAll( async() => {
  await sequelize.sync();
});

afterAll( async() => {
  await sequelize.drop();
});

describe('HTTP REST client', () => {

  test('Should post 404: Bad route', async () => {
    const response = await request.get('/this-is-a-bad-route');
    expect(response.status).toEqual(404);
  });

  test('Should post 404: Bad method', async () => {
    const response = await request.patch('/signin');
    expect(response.status).toEqual(404);
  })

  test('Should post a succcess status', async () => {
    const response = await request
    .post('/signup')
    .send({
      'username': 'user',
      'password': 'password'
    });
    expect(response.status).toEqual(200);
    },
  );
  
  test('Should post a success status', async () => {
    const response = await request
    .post('/signup')
    .auth('user', 'password');
    
    expect(response.status).toEqual(200);
  })
})