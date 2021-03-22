const { User } = require('../models');
// const { db } = require('../models/Movie');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
    // get all Users
    // getAllUser(req, res) {
    //     User.find()
    //     .select('-__v')
    //     .then(dbUserData => res.json(dbUserData))
    //     .catch(err => {
    //         console.log(err);
    //         res.status(400).json(err);
    //     });
    // },
    
    // get one User by id
    async getUserById({ user = null, params }, res) {
        const foundUser = await User.findOne({
          $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });
    
        if (!foundUser) {
          return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }
    
        res.json(foundUser);
      
    },

    //Create a User
    async createUser({ body }, res) {
        const user = await User.create(body);
    
        if (!user) {
          return res.status(400).json({ message: 'Something is wrong!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },
    async login({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (!user) {
          return res.status(400).json({ message: "Can't find this user" });
        }
    
        const correctPw = await user.isCorrectPassword(body.password);
    
        if (!correctPw) {
          return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        res.json({ token, user });
      },
    async saveMovie({ user, body }, res) {
        console.log(user);
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { movies: body } },
            { new: true, runValidators: true }
          );
          return res.json(updatedUser);
        } catch (err) {
          console.log(err);
          return res.status(400).json(err);
        }
      },
      // remove a movie from `savedMovies`
      async deleteMovie({ user, params }, res) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { movies: { imdbID: params.imdbID } } },
          { new: true }
        );
        if (!updatedUser) {
          return res.status(404).json({ message: "Couldn't find user with this id!" });
        }
        return res.json(updatedUser);
      },

    // // update User by id
    // updateUser({ params, body }, res) {
    //     User.findOneAndUpdate(
    //         { 
    //             _id: params.userId 
    //         }, 
    //         { 
    //             $set: body 
    //         }, 
    //         { 
    //             runValidators: true, 
    //             new: true 
    //         }
    //     )
    //     .then(dbUserData => {
    //         if (!dbUserData) {
    //         res.status(404).json({ message: 'No User found with this id!' });
    //         return;
    //         }
    //         res.json(dbUserData);
    //     })
    //     .catch(err => res.status(400).json(err));
    // },
    
    // // delete User
    // deleteUser({ params }, res) {
    //     User.findOneAndDelete(
    //         { 
    //             _id: params.userId 
    //         }
    //     )
    //     .then(dbUserData => {
    //         if (!dbUserData) {
    //         res.status(404).json({ message: 'No User found with this id!' });
    //         return;
    //         }
    //         //Deleting Movies
    //         return Movie.deleteMany(
    //             { 
    //                 _id: {$in:dbUserData.movies}
    //             }
    //         );
    //     })
    //     .then(() => {res.json({message: 'Deleted the User and Movies associated with the User'})})
    //     .catch(err => res.status(400).json(err));
    // },
};

