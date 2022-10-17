
class TeamController {
    constructor({ teamService }) {
        this.teamService = teamService
    }
    
    async getTeam(request, response) {
        try {
            await this.teamService.getTeam()
            return response.end('hahahah')
        } catch(err) {
            response
                .writeHead(500)
                .end(JSON.stringify({ error: 'Erro interno do servidor'}))
        }

    }
}

module.exports = { TeamController }