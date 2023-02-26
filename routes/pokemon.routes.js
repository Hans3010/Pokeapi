const { Router } = require('express');
const {
  findPokemons,
  findPokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
} = require('../controllers/pokemon.controller');
const { validPokemonById } = require('../middlewares/pokemon.middleware');

const router = Router();

router.get('/', findPokemons);

router.get('/:id', validPokemonById, findPokemon);

router.post('/', createPokemon);

router.patch('/:id', validPokemonById, updatePokemon);

router.delete('/:id', validPokemonById, deletePokemon);

module.exports = {
  pokemonRouter: router,
};
