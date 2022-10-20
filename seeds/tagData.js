const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'Nightmare',
  },
  {
    tag_name: 'Funny Dream',
  },
  {
    tag_name: 'Recurring Dream',
  },
  {
    tag_name: 'Clown Dream',
  },
  {
    tag_name: 'Dating',
  },
  {
    tag_name: 'Lost',
  },
  {
    tag_name: 'Falling',
  },
  {
    tag_name: 'Adventure',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
