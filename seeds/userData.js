const { User } = require('../models');

const userdata = [
  {
    username: 'FunGuy',
    email: 'funguy@email.com',
    password: 'password',
  },
  {
    username: 'Dreams',
    email: 'dreams@email.com',
    password: 'password',
  },
  {
    username: 'Superhappy',
    email: 'funtimes@email.com',
    password: 'password',
  },
  {
    username: 'Coding',
    email: 'ishard@email.com',
    password: 'password',
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
