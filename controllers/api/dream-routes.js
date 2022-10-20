const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Dream, User, Comment, DreamTag } = require('../../models');

router.get('/', (req, res) => {
    Dream.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'dream_id', 'created_at'],
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
        .then(dbDreamData => res.json(dbDreamData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    Dream.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'description',
            'created_at'
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
            }
        ]
    })
        .then(dbDreamData => {
            if (!dbDreamData) {
                res.status(404).json({ message: 'No dreams found with this id' });
                return;
            }
            res.json(dbDreamData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    if (req.session) {
      Dream.create({
        title: req.body.title,
        description: req.body.description,
        public: req.body.public,
        user_id: req.session.user_id,
        tag_id: req.session.tag_id
      })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });


module.exports = router;