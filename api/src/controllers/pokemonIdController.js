const { Pokemon, Type } = require("../db");
const { getApiInfo } = require("./pokemonController");

const getPokemonById = async (id) => {
    const dataId = id.includes("-");

    try {
        if(dataId){
            const dataPokemon = await Pokemon.findOne({
                where: {
                    id: id
                },
                include: {
                    model: Type,
                    through: {
                        attributes: []
                    }
                }
            })
            //console.log(dataPokemon);
            //Creo un obj con los atributos de la tabla:
            const infoPokemonDb = {
                id: dataPokemon.id,
                name: dataPokemon.name,
                image: dataPokemon.image,
                types: dataPokemon.types.map((el) => el.name).join(" - "),
                live: dataPokemon.live,
                attack: dataPokemon.attack,
                defense: dataPokemon.defense,
                velocity: dataPokemon.velocity,
                height: dataPokemon.height,
                weight: dataPokemon.weight,
                createdInDb: dataPokemon.createdInDb
            }
            return infoPokemonDb;
        }else{
            const infoApi = await getApiInfo();

            const infoPokemonApi =  infoApi.find((el) => el.id.toString() === id);
            //console.log(infoPokemonApi)==>Es un Objeto...!! Si usamos el Metodo Find()
            return infoPokemonApi;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getPokemonById };