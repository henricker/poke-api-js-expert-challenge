const { expect } = require("chai");
const { describe, beforeEach, afterEach } = require("mocha");
const Sinon = require("sinon");
const { teamService, teamRepository } = require('../../../src/factory/team-factory');
const { pokemon1MockExpect, pokemon2MockExpect, pokemon3MockExpect } = require("../../mocks/expects/pokemon-expect");

const arrayWithPokemons = require('../../mocks/pokemons-request/array-with-pokemons.json')
const pokemon1Request = require('../../mocks/pokemons-request/pokemon1.json')
const pokemon2Request = require('../../mocks/pokemons-request/pokemon2.json')
const pokemon3Request = require('../../mocks/pokemons-request/pokemon3.json')

describe('TeamService', () => {
    let sandbox = Sinon.createSandbox();
    beforeEach(() => {
        sandbox = Sinon.createSandbox();
    })
    afterEach(() => {
        sandbox.restore();
    })
    describe('getRandomElementFromArray', () => {
        it('should return a random element from an array', () => {
            const list = [1, 'a', true, 'aspdoapso02191']
            const result = teamService.getRandomElementFromArray(list)
            expect(list).to.include(result)
        })
    })

    describe('GetMultipleElementsFromArray', () => {
        it('should return a multiple elements from an array', () => {
            const list = [1, 'a', true, 'aspdoapso02191']
            const result = teamService.getMultipleElementsFromArray(list, 2)
            expect(result).to.be.an('array').that.has.lengthOf(2)
            
            result.forEach(element => {
                expect(list).to.include(element)
            })
        })
    })

    describe('getTeam', () => {
        it('should return a team with 3 members', async  () => {
            const mockedResolves = [
                pokemon1MockExpect,
                pokemon2MockExpect,
                pokemon3MockExpect
            ]

            sandbox.stub(teamRepository, 'listPokemons').resolves(arrayWithPokemons)
 
            sandbox.stub(teamRepository, 'createRequest')
                .withArgs('https://pokeapi.co/api/v2/pokemon/1').resolves(JSON.stringify({ results: pokemon1Request }))
                .withArgs('https://pokeapi.co/api/v2/pokemon/2').resolves(JSON.stringify({ results: pokemon2Request }))
                .withArgs('https://pokeapi.co/api/v2/pokemon/3').resolves(JSON.stringify({ results: pokemon3Request }))
                
            sandbox.stub(teamService, 'getMultipleElementsFromArray').returns(arrayWithPokemons)

            const result = await teamService.getTeam()
            expect(result).to.be.an('array').that.has.lengthOf(3)
            expect(result).to.be.deep.equal(mockedResolves)
        })
    })
})