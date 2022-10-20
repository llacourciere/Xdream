const router = require('express').Router();

const userRoutes = require('./user-routes');
const dreamRoutes = require('./dream-routes');

router.use('/users', userRoutes);
router.use('/dreams', dreamRoutes);

module.exports = router;