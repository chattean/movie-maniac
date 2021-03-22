const { AuthenticationError } = require("apollo-server-express");
const { User, Movie } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id)
          .select("-__v -password")
          .populate("movies");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    }
},

//     movies: async (parent, { category, name }) => {
//       const params = {};

//       if (category) {
//         params.category = category;
//       }

//       if (name) {
//         params.name = {
//           $regex: name,
//         };
//       }

//       return await Movie.find(params).populate("category");
//     },
//     movie: async (parent, { _id }) => {
//       return await Movie.findById(_id).populate("category");
//     },

//     comment: async (parent, { _id }, context) => {
//       if (context.user) {
//         const user = await User.findById(context.user._id).populate({
//           path: "comments.movies",
//           populate: "category",
//         });

//         return user.comment.id(_id);
//       }

//       throw new AuthenticationError("Not logged in");
//     },
//   },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
    // addComment: async (parent, { movies }, context) => {
    //   console.log(context);
    //   if (context.user) {
    //     const comment = new Comment({ movies });

    //     await User.findByIdAndUpdate(context.user._id, {
    //       $push: { movies: movie },
    //     });

    //     return movie;
    //   }

    //   throw new AuthenticationError("Not logged in");
    // },
    // updateUser: (parent, args, context) => {
    //   if (context.user) {
    //     return User.findByIdAndUpdate(context.user._id, args, { new: true });
    //   }

    //   throw new AuthenticationError("Not logged in");
    // },
    saveMovie: (parent, { movie }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { $push: { movies: movie } },
          { new: true }
        );
      }

      throw new AuthenticationError("Not logged in");
    },
    removeMovie: (parent, { movieId }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { $pull: { movies: { movieId: movieId } } },
          { new: true }
        );
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
