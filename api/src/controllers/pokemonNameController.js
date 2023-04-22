const { default: axios } = require("axios");

const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");

const getPokemonByName = async (name) => {
    try {
        const resDB = await Pokemon.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                }
            },
            include: {
                model: Type,
                attributes: ['name'],
            }
        });
        //console.log(resDB);
        //Es un array [] "Ojo"!con un objeto pokemon, que tiene una propiedad dataValues, que es un Obj con las propiedades de la tabla Pokemon
        //Valido:
        if(resDB.length){
            const pokeDb = resDB.map( el => {
                return {
                    id: el.id,
                    name: el.name,
                    image: el.image,
                    live: el.live,
                    types: el.types.map(t => t.name).join(" - "),
                    attack: el.attack,
                    defense: el.defense,
                    velocity: el.velocity,
                    height: el.height,
                    weight: el.weight,
                    createdInDb: el.createdInDb
                }
            });
            //console.log(pokeDb);//Retorno un array con un objeto pokemon [{...}];
            return pokeDb;
        }else{
            const pokeApi = [];
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            const pokeData = res.data
            const pokemonByName = {
                id: pokeData.id,
                name: pokeData.name,
                image: pokeData.sprites.front_default,
                types: pokeData.types.map((el) => el.type.name).join(" - "),
                live: pokeData.stats[0].base_stat,
                attack: pokeData.stats[1].base_stat,
                defense: pokeData.stats[2].base_stat,
                velocity: pokeData.stats[5].base_stat,
                height: pokeData.height,
                weight: pokeData.weight,
            }
            pokeApi.push(pokemonByName);
            return pokeApi;
            //Reutilizando el codigo "60 pokemons por el momento"-----------///
            // const allPokemons = await getAllPokemon();
            // console.log(allPokemons);
            // const pokemon = allPokemons.filter((el) => el.name.toLowerCase() === name.toLowerCase());
            // console.log(pokemon);
            // return pokemon;
            //------------------------------------------------------------//
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getPokemonByName };