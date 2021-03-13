// import dependencies
const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat')
const commentSchema = require('./Comment');
const movieCategories = ['horror', 'drama', 'comedy']

const movieSchema = new Schema({
    movieTitle: {
        type: String,
        //Validation for 1 to 280 chars
        minlength: 1,
        maxlength: 280,
        //required
        required: 'Please have a proper movie title'
    },
    category: {
        type: String,
        enum: movieCategories,
        lowercase: true,
        required: true
    },
    // Use moment in the getter method to format the timestamp on query
    // const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
    createdAt: {
        type: Date,
        default: Date.now,
        $gte: dateFormat()
    },
    // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
    comments:
        // array of nested documents created with the reactionSchema
        [
            commentSchema
        ]
},
    {
        toJSON: {
            getters: true
        },
        id: false
    });
// Getting movie categories
movieSchema.static('getCategories', () => Array.from(movieCategories))

// Comments left by the user
movieSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

// create the movie model using the UserSchema
const Movie = model('Movie', movieSchema);
Movie.getCategories()
// export the movie model
module.exports = Movie;
