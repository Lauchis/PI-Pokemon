/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
// const { INET } = require('sequelize/dist');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  // describe('GET /pokemon', () => {
  //   it('should get 200', () =>
  //     agent.get('/pokemon').expect(200)
  //   );
  // });

  describe('GET/pokemon/:id', () => {
    it('should get 200', () =>
    agent.get('/pokemon/101').expect(200));
  })

  describe('GET/pokemon?name', () => {
    it('should get 200 if you put a valid name', () =>
    agent.get('/pokemon?name=pikachu').then(() => expect(200)));
  })

  describe('GET/type', () => {
    it('should get 200 in the route of type', () =>
    agent.get('/type').expect(200));
  })

});
