const { teamController } = require("../factory/team-factory");

const teamRoutes = {
    '/team:get': teamController.getTeam
}
module.exports = teamRoutes