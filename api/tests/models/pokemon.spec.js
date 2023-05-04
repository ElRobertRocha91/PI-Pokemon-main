const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');
const db = require('../../src/db.js');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    it('should create a Pokemon', async () => {
      const pokemon = await Pokemon.create({
        name: 'Pikachu',
        image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        live: 35,
        attack: 55,
        defense: 40,
        velocity: 90,
        height: 4,
        weight: 60,
        createInDb: true
      });

      expect(pokemon.name).to.equal('Pikachu');
      expect(pokemon.image).to.equal('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pokemon.live).to.equel(35);
      expect(pokemon.attack).to.equel(55);
      expect(pokemon.defense).to.equel(40);
      expect(pokemon.velocity).to.equel(90);
      expect(pokemon.height).to.equel(4);
      expect(pokemon.weight).to.equel(60);
      expect(pokemon.createInDb).to.be.true;
    });

    afterEach(async () => {
      await db.sync({force:true});
      db.close();
    })
    // describe('name', () => {
    //   it('should throw an error if name is null', (done) => {
    //     Pokemon.create({})
    //       .then(() => done(new Error('It requires a valid name')))
    //       .catch(() => done());
    //   });
    //   it('should work when its a valid name', async () => {
    //     try {
    //       await Pokemon.create({ name: 'Pikachu', image: 'pokemon.png', live: 10});
    //     } catch (error) {
    //       expect(error.message).toBeDefined();
    //     }
    //   });
    // });
    // describe('image', () => {
    //   it('Deberia crear un Pokemon si image no esta escrita', (done) => {
    //     Pokemon.create({name: 'Pikachu', live: '10'})
    //           .then(() => done(new Error('It requires a valid image')))
    //           .catch(() => done());
    //   });
    //   it('Deberia trabajar mientras la image este validado', async () => {
    //     try {
    //       await Pokemon.create({name: 'Pikachu', image: 'pokemon.png', live: 10});
    //     } catch (error) {
    //       expect(error.message).toBeDefined();
    //     }
    //   });
    // });
    // describe('live', () => {
    //   it('Debería producir un error si live esta null', (done) => {
    //     Pokemon.create({})
    //       .then(() => done(new Error('It requires a valid live')))
    //       .catch(() => done());
    //   });
    //   it('Debería trabajar mientras live este validado', async () => {
    //     try {
    //       await Pokemon.create({name: 'Pikachu', image: 'pokemon.png', live: 10});
    //     } catch (error) {
    //       expect(error.messaje).toBeDefined();
    //     }
    //   })
    // })
  });
});
