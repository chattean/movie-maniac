const { User, Movie } = require('../models');
const { db } = require('../models/Movie');

const userController = {
    // get all Users
    getAllUser(req, res) {
        User.find()
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    // get one User by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
        .select('-__v')
        .populate('movies')
        .then(dbUserData => {
            // If no User is found, send 404
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            //returns the User with the ID specified
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //Create a User
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // update User by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { 
                _id: params.userId 
            }, 
            { 
                $set: body 
            }, 
            { 
                runValidators: true, 
                new: true 
            }
        )
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    
    // delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete(
            { 
                _id: params.userId 
            }
        )
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            //Deleting Movies
            return Movie.deleteMany(
                { 
                    _id: {$in:dbUserData.movies}
                }
            );
        })
        .then(() => {res.json({message: 'Deleted the User and Movies associated with the User'})})
        .catch(err => res.status(400).json(err));
    },

//     // Adding a friend 
//     addFriend({params},res){
//         User.findOneAndUpdate(
//             {
//                 _id: params.userId
//             }, 
//             {
//                 $addToSet:{ friends: params.friendId }
//             },
//             {
//                 new:true
//             }
//         )
//         .then(dbUserData => {
//             if (!dbUserData) {
//             res.status(404).json({ message: 'No User found with this id!' });
//             return;
//             }
//             res.json(dbUserData);
//         })
//         .catch(err => res.status(400).json(err));
//     },
    
//     //delete a friend 
//     deleteFriend({params}, res){
//         User.findByIdAndUpdate(
//             {
//                 _id: params.userId
//             }, 
//             {
//                 $pull:{ friends: params.friendId }
//             },
//             {
//                 new:true
//             }
//         )
//         .then(dbUserData => {
//             if (!dbUserData) {
//             res.status(404).json({ message: 'No User found with this id!' });
//             return;
//             }
//             res.json(dbUserData);
//         })
//         .catch(err => res.status(400).json(err));
//     }
};

module.exports = userController;