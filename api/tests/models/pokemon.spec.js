const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });

    describe('hp', () => {
      it('should thrown an error if hp is not a number', (done) => {
        Pokemon.create({ name: 'Pikachu', hp: 'asdfg' })
          .then(() => done(new Error('HP must be a number')))
          .catch(() => done());
      });
      it('should work when its a valid hp', () => {
        Pokemon.create({ name: 'Pikachu', hp: '44' });
      })
    })

    describe('attack', () => {
      it('should thrown an error if attack is not a number', (done) => {
        Pokemon.create({ name: 'Pikachu', attack: 'asdfg' })
          .then(() => done(new Error('Attack must be a number')))
          .catch(() => done());
      });
      it('should work when its a valid attack', () => {
        Pokemon.create({ name: 'Pikachu', attack: '44' });
      })
    })


    describe('type', () => {
      it('should throw an error if type is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid number type')))
          .catch(() => done());
      });
      it('should work when its a valid number type', () => {
        Pokemon.create({ type: '6' });
      });
    });

  });
});
