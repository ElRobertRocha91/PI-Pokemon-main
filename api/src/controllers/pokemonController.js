const { Pokemon, Type } = require("../db");
const axios = require("axios");
//, { headers: {"accept-encoding": "*"}, }
//Obtengo la info de la API:
const getApiInfo = async () => {
    try {
        const info = await axios.get("https://pokeapi.co/api/v2/pokemon");
        //console.log(info.data.results)
        const data = info.data.next;
        //console.log(data);
        const info2 = await axios.get(data);
        //console.log(info2.data.results);
        //const info3 = [info.data.results,...info2.data.results];
        const info3 = info.data.results.concat(info2.data.results); 
        //console.log(info3);// ===>> [{},{},{},{}];

        const infoTotal = [];
        for (let i = 0; i < info3.length; i++) {
               let obj = await axios(info3[i].url)
               infoTotal.push({
                id: obj.data.id,
                name: obj.data.name,
                image: obj.data.sprites.other["official-artwork"].front_default,
                types: obj.data.types.map((el) => el.type.name).join(" - "),
                live: obj.data.stats[0].base_stat,
                attack: obj.data.stats[1].base_stat,
                defense: obj.data.stats[2].base_stat,
                velocity: obj.data.stats[5].base_stat,
                height: obj.data.height,
                weight: obj.data.weight
               })
        }
        //console.log(infoTotal);
        return infoTotal;
    } catch (error) {
        console.log(error);
    }
}

//Obtengo la info de la DATA BASE:
const getInfoDb = async () => {
    try {
        const infoData = await Pokemon.findAll({
            include: [
                {
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: {}
                    }
                }
            ]
        })
        //console.log(infoData);

        const infoDb = infoData.length ?
        infoData.map( el => {
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
        }) :
        [];
        //console.log(infoDb);
        return infoDb;
    } catch (error) {
        console.log(error);
    }
}

//Obtengo todos los Pokemons:
const getAllPokemon = async () => {
    try {
        const apiInfo = await getApiInfo();
        const dbInfo = await getInfoDb();
        //console.log(apiInfo);
        //console.log(dbInfo);
        const allPokemon = [...apiInfo, ...dbInfo];
        return allPokemon;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllPokemon, getInfoDb, getApiInfo };