const { getPokemonById } = require("../controllers/pokemonIdController");

const getDetailPokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const pokemon = await getPokemonById(id);
        console.log(pokemon);
        //Valido
        if(!pokemon){      
            throw new Error(`No existe el pokemon con el id: ${id}`);
        }
        res.status(200).json(pokemon);
    } catch (error) {
        console.log(error)
        res.status(404).send(error.message);
    }
}

module.exports = { getDetailPokemonById };