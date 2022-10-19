const sequelize = require('../config/connection');
const seedUser= require('./userData');
const seedDreams = require('./dreamData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  console.log('---Users Seeded---');

  //await seedDreams();

  process.exit(0);
};

seedAll();
