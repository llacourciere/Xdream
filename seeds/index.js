const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedDreams = require('./dreamData');
const seedTags = require('./tagData');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });

    await seedUser();
    console.log('---Users Seeded---');

    await seedTags();
    console.log('---Tags Seeded----');

    await seedDreams();
    console.log('---Dreams Seeded----');

    process.exit(0);
  } catch (error) {
    console.log(error);
  }

};

seedAll();
