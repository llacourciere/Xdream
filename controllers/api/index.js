const router = require('express').Router();

const userRoutes = require('./user-routes')
const dreamRoutes = require('./dream-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/dreams', dreamRoutes);
router.use('/comments', commentRoutes);


module.exports = router;