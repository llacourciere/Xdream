const router = require('express').Router();
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');
const { Dream, User, Comment} = require('../../models');

//get all dreams
router.get('/', (req, res) => {
    Dream.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'created_at',
            'tag_id'
        ],
        //include comments and associated users for the dreams
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

//get a single dream
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

//create a dream and associate it with the user session so it is attached to the users account
router.post('/', (req, res) => {
    if (req.session) {
      Dream.create({
        title: req.body.title,
        description: req.body.description,
        public: req.body.public,
        user_id: req.session.user_id,
        tag_id: req.body.tag_id
      })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });

  router.put('/:id', (req, res) => {
    Dream.update(
      {
        title: req.body.title,
        description: req.body.description,
        tag_id: req.body.tag_id
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbDreamData => {
        if (!dbDreamData) {
          res.status(404).json({ message: 'No dream found with this id' });
          return;
        }
        res.json(dbDreamData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  //delete a dream by the id 
  router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Dream.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbDreamData => {
        if (!dbDreamData) {
          res.status(404).json({ message: 'No dream found with this id' });
          return;
        }
        res.json(dbDreamData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
module.exports = router;