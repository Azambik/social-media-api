const router = require('express').Router();

const userRoutes = require('./user-routes');
const thoughtRouts = require('./thought-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRouts);

module.exports = router;