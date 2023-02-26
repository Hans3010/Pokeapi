const Pokemon = require('../models/pokemon.model');
const AppError = require('../utils/app.Error');
const catchAsync = require('../utils/catchAsync');

exports.findPokemons = catchAsync(async (req, res, next) => {
  const { count, rows } = await Pokemon.findAndCountAll({
    attributes: ['id', 'name', 'image'],
    where: {
      status: 'available',
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'The pokemons were found sucessfully',
    count,
    results: rows,
  });
});

exports.findPokemon = catchAsync(async (req, res, next) => {
  const { pokemon } = req;
  res.status(200).json({
    status: 'success',
    message: 'The pokemon was found successfully',
    pokemon,
  });
});

exports.createPokemon = catchAsync(async (req, res, next) => {
  const { name, image } = req.body;
  const pokemon = await Pokemon.create({
    name: name.toLowerCase(),
    image,
  });
  res.status(201).json({
    status: 'success',
    message: 'The pokemon was created successfully ',
    pokemon,
  });
});

exports.updatePokemon = catchAsync(async (req, res, next) => {
  const { pokemon } = req;
  const { name, image } = req.body;
  await pokemon.update({
    name: name.toLowerCase(),
    image,
  });
  res.status(200).json({
    status: 'success',
    message: 'The pokemon was updated successfully',
  });
});

exports.deletePokemon = catchAsync(async (req, res, next) => {
  const { pokemon } = req;
  await pokemon.update({ status: 'disabled' });
  res.status(200).json({
    status: 'success',
    message: 'The pokemon has been deleted successfully',
  });
});
