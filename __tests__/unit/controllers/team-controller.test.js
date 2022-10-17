const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");
const { teamController, teamService } = require("../../../src/factory/team-factory");
const { responseMock, requestMock } = require("../../mocks/http.mock");

describe('TeamController', () => {
    let sandBox = null;
    beforeEach(function () {
        sandBox = Sinon.createSandbox()
    });

    afterEach(function () {
        sandBox.restore();
    });
    describe('getTeam', () => {
        it('Should return an error 500 if service called throws', async () => {
           const stub = sandBox.stub(
                teamService,
                'getTeam'
           )

            await teamController.getTeam(requestMock, responseMock);
            expect(stub.callCount).to.be.equal(1)
        });

        it('Should set status code to 500 and add message error', async () => {
            sandBox.stub(
                teamService,
                'getTeam'
            ).rejects(new Error('Error'))

            teamController.getTeam(requestMock, responseMock).then(() => {
                expect(responseMock.writeHead.calledWith(500)).to.be.ok
                expect(responseMock.end.calledWith(JSON.stringify({ error: 'Erro interno do servidor'}))).to.be.ok
            })
        })
    });
})