const router = require('express').Router();
const { User, Dream, Comment, Tag } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    console.log("i'm hit!");
    Dream.findAll({
        where: {
            public: true
        },
        attributes: [
            'id',
            'title',
            'description',
            'public',
            'created_at'
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
                model: Tag
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