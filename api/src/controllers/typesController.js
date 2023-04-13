const { Type } = require("../db");
const axios = require("axios");

const getTypesPokemonApi = async () => {
    //Consulto si existen datos en mi DATABASE
    const typesDb = await Type.findAll();
    //console.log(typesDb);
    //Si no exiten, los busco de la API y los guardo en DB
    if(!typesDb.length){
        const infoApi = await axios.get("https://pokeapi.co/api/v2/type");

        const typesApi = infoApi.data.results.map((el) => el.name);
        typesApi.map(async (el) => {
            await Type.findOrCreate({
                where: { name: el }
            })
        })

        const allTypes = await Type.findAll();
        return allTypes;
    }else{
        return typesDb;
    }
}

module.exports = { getTypesPokemonApi };