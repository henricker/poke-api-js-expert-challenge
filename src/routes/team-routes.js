const { teamController } = require("../factory/team-factory");

const teamRoutes = {
    '/team:get': teamController.getTeam.bind(teamController),
}
module.exports = teamRoutes