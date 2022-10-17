const { expect } = require("chai");
const { describe } = require("mocha");
const supertest = require('supertest');
const { server } = require('../../src/api')

describe('API routes', () => {
    describe('GET /team', () => {
        it('Should return status code 200', async () => {
            const response = await supertest(server).get('/team');
            expect(response.statusCode).to.be.equal(200);
        });

        it('Should return 3 pokemons', async () => {
            const response = await supertest(server).get('/team');
            expect(response.body.length).to.be.equal(3);
        })

        it('Should return three moves to each pokemon', async () => {
            const response = await supertest(server).get('/team');

            response.body.forEach(pokemon => {
                expect(pokemon.moves.length).to.be.equal(3);
            })
        })
    });
})