const Sinon = require("sinon");

const requestMock = {

}
const responseMock = {
    end: Sinon.stub().returnsThis(),
    writeHead: Sinon.stub().returnsThis()
}

module.exports = {
    responseMock,
    requestMock
}