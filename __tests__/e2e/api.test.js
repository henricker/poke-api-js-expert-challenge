const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");
const supertest = require('supertest');
const { server } = require('../../src/api');
const { teamRepository } = require("../../src/factory/team-factory");
const { IncomingMessage } = require('http')

describe('API routes', () => {
    let sandbox = Sinon.createSandbox();
    beforeEach(() => {
        sandbox = Sinon.createSandbox();
    })
    afterEach(() => {
        sandbox.restore();
    })
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

        it('Should return 500 status code when an error occurs', async () => {
            sandbox.stub(
                teamRepository,
                'createRequest',
            ).rejects(new Error('Error'))

            const response = await supertest(server).get('/team');
            expect(response.statusCode).to.be.equal(500);
        })
    });

    describe('default route', () => {
        it('Should return 404 status and message error if route not found', async () => {
            const response = await supertest(server).get('/not-found').expect(404)
            
            expect(response.text).to.be.equal(JSON.stringify({
	            "error": "Not found route"
            }))
        })
    })
})