const { getTypesPokemonApi } = require("../controllers/typesController");

const getTypes = async (req, res) => {
    try {
        const types = await getTypesPokemonApi();
        if(!types){
            throw new Error("Error al solicitar los tipos de pokemon");
        }else{
            res.status(200).json(types);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = { getTypes };