const { DEFAULT_HEADERS } = require("../api")
const teamRoutes = require("./team-routes")

module.exports = {
    'default': (req, res) => {
        res.writeHead(404, DEFAULT_HEADERS)
        return res.end(JSON.stringify({ error: 'Not found route' }))
    },
    ...teamRoutes
}