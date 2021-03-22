// import dependencies
const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt')
// import schema from Book.js
const movieSchema = require('./Movie');

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 40,
    },
    email: {
        // validation for mongoose
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    //array of Objects of Object IDs
    movies: [
        movieSchema
        ],
    // comments: [{
    //     // reference the movie model
    //     // _id:
    //     movieId: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Movie'
    //     },
    //     commentId: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Movie.comments'
    //     }
    // },],
},
    // Create a virtual called MovieCount that retrieves the length of the user's Movie array field on query.
    {
        toJSOn: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('movieCount').get(function () {
    return this.movies.length;
})
userSchema.pre('save', async function (next) {


    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(11))
        next();
    } catch (error) {
        next(error)
    }

});

userSchema.methods.isCorrectPassword = function (candidatePassword, cb) {
    return bcrypt.compare(candidatePassword, this.password)
};


// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('bookCount').get(function () {
    return this.savedMovies.length;
  });
  

// create the User model using the UserSchema
const User = mongoose.model('User', userSchema);
// export the User model
module.exports = User;
