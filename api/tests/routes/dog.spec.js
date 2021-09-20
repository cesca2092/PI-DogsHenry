/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe('Dogs Temperament route test', () => {
  describe('GET /temperament', () => {
    it('responds with status 200', () => agent.get('/temperament').expect(200))
  })
});
