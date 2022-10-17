const { createServer } = require('http')
const routes = require('./routes')

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
}

function handle(req, res) {
    const { pathname } = new URL(req.url, 'http://localhost:3000')
    const key = `${pathname.toLocaleLowerCase()}:${req.method.toLowerCase()}`
    const route = routes[key] || routes['default']


    res.writeHead(200, DEFAULT_HEADERS)
    return route(req, res)
}

const server = createServer(handle)

module.exports = { server, DEFAULT_HEADERS }