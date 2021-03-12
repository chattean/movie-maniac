const { Movie, User } = require('../models');

const movieController = {
    // get all Movies
    getAllMovies(req, res) {
        Movie.find()
        .then(dbMovieData => res.json(dbMovieData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    // get one Movie by id
    getMovieById({ params }, res) {
        Movie.findOne(
            { 
                _id: params.movieId 
            }
        )
        .then(dbMovieData => {
            // If no Movie is found, send 404
            if (!dbMovieData) {
                res.status(404).json({ message: 'No Movie found with this id!' });
                return;
            }
            //returns the Movie with the ID specified
            res.json(dbMovieData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //Create a Movie
    createMovie({ body }, res) {
        Movie.create(body)
        .then((dbMovieData) => {
            return User.findOneAndUpdate(
                { 
                    _id: body.userId 
                },
                { 
                    $push: { movies: dbMovieData._id } 
                },
                { 
                    new: true 
                }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'no user with this id!' });
            }
    
            res.json({ message: 'Movie successfully created!' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    // update Movie by id
    updateMovie({ params, body }, res) {
        Movie.findOneAndUpdate(
            { 
                _id: params.movieId 
            }, 
            {
                $set:body
            }, 
            {
                runValidators: true, 
                new: true 
            }
        )
        .then(dbMovieData => {
            if (!dbMovieData) {
            res.status(404).json({ message: 'No Movie found with this id!' });
            return;
            }
            res.json(dbMovieData);
        })
        .catch(err => res.status(500).json(err));
    },
    
    // delete Movie
    deleteMovie({ params }, res) {
        Movie.findOneAndDelete({ _id: params.movieId })
        .then(dbMovieData => {
            if (!dbMovieData) {
            res.status(404).json({ message: 'No Movie found with this id!' });
            return;
            }
            res.json(dbMovieData);
        })
        .catch(err => res.status(500).json(err));
    },

    //Add a Reaction
    createReaction({params, body}, res) {
        Movie.findOneAndUpdate(
            { 
              _id: params.movieId 
            },
            { 
                $addToSet: { reactions: body } 
            },
            { 
                runValidators: true, 
                new: true 
            }
        )
          .then((dbMovieData) => {
            if (!dbMovieData) {
              return res.status(404).json({ message: 'No movie with this id!' });
            }
            res.json(dbMovieData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    //Delete a Reaction
    deleteReaction(req, res) {
        Movie.findOneAndUpdate(
          { _id: req.params.movieId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((dbMovieData) => {
            if (!dbMovieData) {
              return res.status(404).json({ message: 'No movie with this id!' });
            }
            res.json(dbMovieData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
};

module.exports = movieController;