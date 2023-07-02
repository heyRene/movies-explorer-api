const moviesRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = moviesRouter;
