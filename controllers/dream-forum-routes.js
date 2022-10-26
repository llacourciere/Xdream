const router = require('express').Router();
const { User, Dream, Comment} = require('../models');
const withAuth = require('../utils/auth');

//get all dreams on the dream forum page that have been marked as public
router.get('/', withAuth, (req, res) => {
    Dream.findAll({
        where: {
            public: true
        },
        attributes: [
            'id',
            'title',
            'description',
            'public',
            'created_at',
            'tag_id'
        ],
        include: [
            {
                model: Comment,
                include: {
                    model: User,
                    attributes:['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbDreamData => {
        const dreams = dbDreamData.map(dream => dream.get({ plain: true }));
        res.render('dream-forum', {
            dreams,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;