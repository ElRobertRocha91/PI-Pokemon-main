const { getAllPokemon } = require("./pokemonController");

const getPokemonByName = async (name) => {
    try {
        const allPokemons = await getAllPokemon();

        const pokemon = allPokemons.find((el) => el.name.toLowerCase() === name.toLowerCase());
        //console.log(pokemon);
        //Valido:
        if(pokemon){
            return pokemon;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getPokemonByName };