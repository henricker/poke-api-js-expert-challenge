const { TeamController } = require("../controllers/team-controller");
const { TeamRepository } = require("../repository/team-repository");
const { TeamService } = require("../service/team-service");

function teamFactory() {
    const teamRepository = new TeamRepository()
    const teamService = new TeamService({ teamRepository })
    const teamController = new TeamController({ teamService })

    return {
        teamController,
        teamService,
        teamRepository
    }
}

module.exports = {
    ...teamFactory()
}