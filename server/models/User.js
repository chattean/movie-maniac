// import dependencies
const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    userName:{
        type: String,
        unique: true,
        trim: true, 
        required: true,
    },
    firstName:{
        type: String, 
        required: true,
        minlength: 1, 
        maxlength: 30,
    },
    lastName:{
        type: String, 
        required: true,
        minlength: 1, 
        maxlength: 40,
    },
    email:{
        // validation for mongoose
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    }, 
    //array of Objects of Object IDs
    movies:[{
        // reference the movie model
        // _id:
        type: Schema.Types.ObjectId,
        ref: 'Movie',
    },],
    comments:[{
        // reference the movie model
        // _id:
        movieId:{
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        },
        commentId:{
            type: Schema.Types.ObjectId,
            ref: 'Movie.comments'
        }
    },],
},
// Create a virtual called MovieCount that retrieves the length of the user's friends array field on query.
{
    toJSOn: {
        virtuals:true,
    },
    id: false,
}
);

userSchema.virtual('movieCount').get(function(){
    return this.movies.length;
})

// create the User model using the UserSchema
const User = model('User', userSchema );
// export the User model
module.exports = User;
