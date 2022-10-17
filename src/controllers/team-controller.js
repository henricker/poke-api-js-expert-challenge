
class TeamController {
    constructor({ teamService }) {
        this.teamService = teamService
    }
    
    async getTeam(request, response) {
        try {
            const randomTeam = await this.teamService.getTeam()
            return response.end(JSON.stringify(randomTeam))
        } catch(err) {
            response
                .writeHead(500)
                .end(JSON.stringify({ error: 'Erro interno do servidor'}))
        }

    }
}

module.exports = { TeamController }