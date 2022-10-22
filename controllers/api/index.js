const router = require('express').Router();

const userRoutes = require('./user-routes')
const dreamRoutes = require('./dream-routes');
const commentRoutes = require('./comment-routes');
const tagRoutes = require('./tag-routes')

router.use('/users', userRoutes);
router.use('/dreams', dreamRoutes);
router.use('/comments', commentRoutes);
router.use('/tags', tagRoutes);


module.exports = router;