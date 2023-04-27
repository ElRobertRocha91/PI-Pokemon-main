const { Pokemon, Type } = require("../db");
const { getApiInfo } = require("../controllers/pokemonController");

const createPokemon = async (req, res) => {
    try {
        const {
            name,
            image,
            live,
            attack,
            defense,
            velocity,
            height,
            weight,
            types
        } = req.body;

        if(!name || !image || !live || !attack || !defense || !types){
            throw new Error("Faltan completar campos obligarorios");
        }
        //Valido si ya existe ese Pokemon en mi DATABASE
        const foundDB = await Pokemon.findAll({
            where: {
                name: name
            }
        })
        //console.log(foundDB)
        if(foundDB.length != 0){
            return res.json({ msg: "Ya existe el Pokemon con ese nombre"});
        }
        //Valido si ya existe en la API
        const allPokemons = await getApiInfo();
        //console.log(allPokemons);
        const found = allPokemons.find(
            (el) => el.name.toLowerCase() === name.toLowerCase()
        );
        //console.log(found);
        if(!found){
            const newPokemon = await Pokemon.create({
                name,
                image,
                live,
                attack,
                defense,
                velocity,
                height,
                weight
            })

            const typesDB = await Type.findAll({
                where: {
                    name: types
                }
            })

            newPokemon.addTypes(typesDB);

            res.status(200).json({msg: "Pokemon created with success"});
        }else{
            res.status(404).json({msg: "Ya existe un Pokemon con ese nombre"});
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({error: error.message});
    }
}

module.exports = { createPokemon };