const { default: axios } = require("axios");
const { Pokemon, Type } = require("../db");


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
            //------Reutilizo el codigo de pokemoncontroller "Por el momento 40 pokemons "----///
            // const infoApi = await getApiInfo();

            // const infoPokemonApi =  infoApi.find((el) => el.id.toString() === id);
            // //console.log(infoPokemonApi)==>Es un Objeto...!! Si usamos el Metodo Find()
            // return infoPokemonApi;
            //-------------------------------------------------------------------------------////
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            //console.log(res);
            const pokemonApi = res.data;
            const infoPokemonApi = {
                id: pokemonApi.id,
                name: pokemonApi.name,
                image: pokemonApi.sprites.other["official-artwork"].front_default,
                types: pokemonApi.types.map((el) => el.type.name).join(" - "),
                live: pokemonApi.stats[0].base_stat,
                attack: pokemonApi.stats[1].base_stat,
                defense: pokemonApi.stats[2].base_stat,
                velocity: pokemonApi.stats[5].base_stat,
                height: pokemonApi.height,
                weight: pokemonApi.weight,
            }
            //console.log(infoPokemonApi)
            return infoPokemonApi;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getPokemonById };