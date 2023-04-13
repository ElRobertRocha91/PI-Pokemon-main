const { Router } = require("express");

const { getPokemon } = require("../handlers/pokemonHandler");
const { getDetailPokemonById } = require("../handlers/pokemonIdHandler");
const { createPokemon } = require("../handlers/createPokemonHandler");

const pokemonRouter = Router();

pokemonRouter.get('/', getPokemon);
pokemonRouter.get('/:id', getDetailPokemonById);
pokemonRouter.post('/', createPokemon);

module.exports = pokemonRouter;