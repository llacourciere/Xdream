const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Dream, Tag, User, Comment, DreamTag } = require('../../models');

router.get('/', (req, res)=> {
    Tag.findAll()
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router; 