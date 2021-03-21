const { Comment, Movie } = require('../models');

const commentController = {
    //add comment to the movie
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                return Movie.findOneAndUpdate(
                    { _id: params.movieId },
                    { $push: { comments: _id } },
                    { new: true }
                );
            })
            .then(dbMovieData => {
                if (!dbMovieData) {
                    res.status(404).json({ message: 'No movie found' });
                    return;
                }
                res.json(dbMovieData);
            })
            .catch(err => res.json(err));
    },

    //remove a comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
            .then(deletedComment => {
                if (!deletedComment) {
                    return res.status(404).json({ message: 'no comment to delete' })
                }
                return Movie.findOneAndUpdate(
                    { _id: params.movieId },
                    {
                        $pull: {
                            comments: params.commentId
                        }
                    },
                    { new: true }
                );
            })
            .then(dbMovieData => {
                if (!dbMovieData) {
                    res.status(404).json({ message: 'no movie found' });
                    return;
                }
                res.json(dbMovieData);
            })
            .catch(err => res.json(err));
    }
}

module.exports = commentController;