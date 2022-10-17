
class TeamService {
    constructor(
        { teamRepository }
    ) {
        this.teamRepository = teamRepository
    }

    getRandomElementFromArray(list) {
        return list[Math.floor(Math.random() * list.length)]
    }

    getMultipleElementsFromArray(list, quantity) {
       return Array(quantity).fill(quantity).map(() => this.getRandomElementFromArray(list))
    }

    async getTeam() {
        const pokemonList = await this.teamRepository.listPokemons()
        const randomTeam = this.getMultipleElementsFromArray(pokemonList, 3)

        return await Promise.all(
            randomTeam.map(async pokemon => {
                const { url } = pokemon
                const pokemonInfo = await this.teamRepository.getPokemon(url)
            
                const moves = pokemonInfo.moves.splice(0, 3)
                return {
                   name: pokemonInfo.name,
                   moves
                }
            })
        )
    }
}

module.exports = { TeamService }
