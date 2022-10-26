const router = require('express').Router();
const { User, Dream, Comment} = require('../models');

//get all dreams and render them on the dashboard if user is logged in
router.get('/', (req, res) => {
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

//login user and take to dashboard once logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

//get a dream by id
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
        //include comments and the user associated with it
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
    //render a single dream 
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