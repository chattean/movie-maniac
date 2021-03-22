
const { Schema } = require('mongoose');
// const commentSchema = require('./Comment');
// const movieCategories = ['horror', 'drama', 'comedy']


const movieSchema = new Schema({
    title: {
        type: String,
        
    },
    image: {
        type: String,
    },
    imdbID: {
        type:String
    }
})
//     category: {
//         type: Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true
//     },
//     // Use moment in the getter method to format the timestamp on query
//     // const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         $gte: dateFormat()
//     },

//     description: {
//         type: String
//     },
//     // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
//     comments:
//         // array of nested documents created with the reactionSchema
//         [
//             {
//                 type: Schema.Types.ObjectId,
//                 commentSchema
//             }
//         ]
// },
//     {
//         toJSON: {
//             virtuals: true,
//             getters: true
//         },
//         id: false
//     });
// // Getting movie categories
// // movieSchema.static('getCategories', () => Array.from(movieCategories))

// // Comments left by the user
// movieSchema.virtual('commentCount').get(function () {
//     return this.comments.length;
// });

// create the movie model using the UserSchema
// const Movie = mongoose.model('Movie', movieSchema);

// export the movie model
module.exports = movieSchema;
