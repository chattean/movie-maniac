const router = require('express').Router();

const {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    createComment,
    deleteComment
  } = require('../../controllers/movie-controller');
  

// Set up GET all and POST at /api/movies
router
  .route('/')
  .get(getAllMovies)
  .post(createMovie);


  // Set up GET one, PUT, and DELETE at /api/movies/:id
  router
  .route('/:movieId')
  .get(getMovieById)
  .put(updateMovie)
  .delete(deleteMovie);

// Getting all the comment for the Movie
router
  .route('/:movieId/comments')
  .post(createComment);

//deleting the comment using the ID for the Comment. 
router
  .route('/:movieId/comments/:commentId')
  .delete(deleteComment)
  
module.exports = router;