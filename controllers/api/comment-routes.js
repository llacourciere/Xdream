const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

//get all comments
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

//create a comment using the users current session so it associates with the user
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        console.log(req.body)
        Comment.create({
            comment_text: req.body.comment_text,
            dream_id: req.body.dream_id,
            user_id: req.session.user_id,
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

//delete a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comments with this id found' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;