const router = require('express').Router();
const { User, Dream, Comment, Tag } = require('../models');

router.get('/', (req, res) => {
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
                model: Tag,
                attributes: ['id','tag_name']
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbDreamData => {
        const dreams = dbDreamData.map(dream => dream.get({ plain: true }));
        res.render('login', {
            dreams,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/dream/:id', (req, res) => {
    Dream.findOne({
        where: {
            id: req.params.id,
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
                attributes: ['id', 'comment_text', 'dream_id', 'created_at'],
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
        if (!dbDreamData) {
            res.status(404).json({ message: 'No dream found with this id' });
            return;
        }
        const dream = dbDreamData.get({ plain: true });
        res.render('single-dream', {
            dream,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;