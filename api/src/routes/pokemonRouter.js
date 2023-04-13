const { Router } = require("express");

const { getPokemon } = require("../handlers/pokemonHandler");
const { getDetailPokemonById } = require("../handlers/pokemonIdHandler");

const pokemonRouter = Router();

pokemonRouter.get('/', getPokemon);
pokemonRouter.get('/:id', getDetailPokemonById);

module.exports = pokemonRouter;