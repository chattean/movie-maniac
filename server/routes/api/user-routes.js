const router = require('express').Router();


const {
    getUserById,
    createUser,
    saveMovie,
    deleteMovie,
    login
  } = require('../../controllers/user-controller');
  

// import middleware
const { authMiddleware } = require('../../utils/auth');

// Set up GET all and POST at /api/users
router.route('/').post(createUser).put(authMiddleware, saveMovie);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getUserById);

router.route('/movies/:imdbID').delete(authMiddleware, deleteMovie);



module.exports = router;