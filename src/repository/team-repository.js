const https = require('https');

const API_URL = 'https://pokeapi.co/api/v2'

class TeamRepository {
    async #createRequest(url) {
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
}

module.exports = { TeamRepository }