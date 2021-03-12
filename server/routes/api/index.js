const router = require('express').Router();
const userRoutes = require('./user-routes');
const movieRoutes = require('./movie-routes');

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', userRoutes);

// add prefix of `/movies` to routes created in `movie-routes.js`
router.use('/movies', movieRoutes);


module.exports = router;