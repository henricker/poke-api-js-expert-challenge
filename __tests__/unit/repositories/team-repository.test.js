const { describe, beforeEach, afterEach } = require("mocha");
const https = require('https')
const Sinon = require("sinon");
const { teamRepository } = require("../../../src/factory/team-factory");
const { expect } = require("chai");

const arrayWithPokemonsMock = require('../../mocks/pokemons-request/array-with-pokemons.json')
const pokemon1Mock = require('../../mocks/pokemons-request/pokemon1.json');
const { pokemon1MockExpect } = require("../../mocks/expects/pokemon-expect");

describe('TeamRepository', () => {
    let sandBox = null;
    beforeEach(() => {
        sandBox = Sinon.createSandbox()
    })
    afterEach(() => {
        sandBox.restore();
    })
    describe('makeRequest', () => {
        it('should call get method of https module with correct url', () => {
            const stub = sandBox.stub(
                https,
                'get'
            )

            const url = 'https://pokeapi.co/api/v2/pokemon/1'
            teamRepository.createRequest(url)
            expect(stub.calledWith(url)).to.be.ok
        })
    })

    describe('listPokemons', () => {
        it('Should return an array of pokemons', async () => {
            const response = {
                results: arrayWithPokemonsMock
            }
            sandBox.stub(
                teamRepository,
                'createRequest'
            ).resolves(JSON.stringify(response))

            const result = await teamRepository.listPokemons()
            expect(result).to.be.deep.equal(response.results)
        })
    })

    describe('getPokemon', () => {
        it('Should return a pokemon', async () => {
            const response = {
                results: pokemon1Mock
            }

            sandBox.stub(
                teamRepository,
                'createRequest',
            ).resolves(JSON.stringify(response))

            const result = await teamRepository.getPokemon('https://pokeapi.co/api/v2/pokemon/1')
            expect(result).to.has.property('name', pokemon1MockExpect.name)
            expect(result).to.has.property('moves')
        })
    })
})