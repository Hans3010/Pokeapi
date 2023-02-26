const Pokemon = require('../models/pokemon.model');
const AppError = require('../utils/app.Error');
const catchAsync = require('../utils/catchAsync');

exports.validPokemonById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const pokemon = await Pokemon.findOne({
    attributes: ['id', 'name', 'image'],
    where: {
      id,
      status: 'available',
    },
  });
  if (!pokemon) {
    return next(new AppError('The pokemon was not found', 404));
  }
  req.pokemon = pokemon;
  next();
});
