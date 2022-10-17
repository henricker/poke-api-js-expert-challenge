const https = require('https');

const API_URL = 'https://pokeapi.co/api/v2'

class TeamRepository {
    async createRequest(url) {
       return new Promise((resolve, reject) => {
            https.get(url, (response) => {
                const chunks = [];
                response.on('data', (chunk) => {
                    chunks.push(chunk);
                })
                response.on('end', () => {
                    const body = Buffer.concat(chunks);
                    resolve(body.toString());
                })
                response.on('error', (err) => {
                    reject(err);
                })
            })
       })
    }

    async listPokemons() {
        const url = `${API_URL}/pokemon`
        const response = await this.createRequest(url)
        return JSON.parse(response).results
    }

    async getPokemon(url) {
        const response = await this.createRequest(url)
        const result = JSON.parse(response)
    
        const pokemon = {
            name: result.name,
            moves: result.moves.map(move => move.move.name),
        }
        return pokemon
    }
}

module.exports = { TeamRepository }