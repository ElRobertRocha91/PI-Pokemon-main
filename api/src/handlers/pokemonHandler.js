const { getAllPokemon } = require("../controllers/pokemonController");
const { getPokemonByName } = require("../controllers/pokemonNameController");

const getPokemon = async (req, res) => {
    try {
        const { name } = req.query;
        const allPokemon = await getAllPokemon();
        if(name){
            const pokemon = await getPokemonByName(name);
            //console.log(pokemon);
            res.status(200).json(pokemon);
        }else{
            //throw new Error("List not found Pokemons");
            res.status(200).json(allPokemon);
        }
    } catch (error) {
        res.status(400).json({msg: "Pokemon not found"});
        console.log("Pokemons not found", error)
    }
}

module.exports = { getPokemon };