const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Dream, User, Comment} = require('../models');

//get all dreams, the associated user and any comments attached to them
router.get('/', withAuth, (req, res) => {
    Dream.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'description',
            'public',
            'tag_id', 
            'created_at'
        ],
        include : [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'dream_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
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
            res.render('dashboard', { dreams, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//edit a dream that is selected by id 
router.get('/edit/:id', withAuth, (req, res) => {
    Dream.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 
            'title', 
            'description',
            'public',
            'tag_id'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'dream_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User, 
                attributes: ['username']
            },
        ]
    })
        .then(dbDreamData => {
            if (!dbDreamData) {
            res.status(404).json({ message: 'No dream found with this id' });
            return;
        }
        const dream = dbDreamData.get({ plain: true });
        res.render('edit-dream', {
            dream,
            loggedIn: true
        });        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// //get all tags from the database
// router.get('/tags', (req, res)=> {
//     Tag.findAll()
//     .then(dbTagData => {
//         const tag = dbTagData.get({ plain: true });
//         res.render('dashboard', { tag, loggedIn: true })})
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// });

module.exports = router;