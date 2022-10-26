const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedDreams = require('./dreamData');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });

    await seedUser();
    console.log('---Users Seeded---');

    await seedDreams();
    console.log('---Dreams Seeded----');

    process.exit(0);
  } catch (error) {
    console.log(error);
  }

};

seedAll();
