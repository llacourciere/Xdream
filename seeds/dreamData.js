const { Dream} = require('../models');

const dreamData = [
  {
    title: 'Clowns of my dreams',
    description: 'It was hidden in a box and now that box sat directly in front of her.',
    public: true,
    user_id: 2,
    tag_id: [1]
  },
  {
    title: 'DreamTown',
    description: 'The answer was within her reach. It was hidden in a box and now that box sat directly in front of her.',
    public: false,
    user_id: 3,
    tag_id: [1,3]
  },
  {
    title: 'Do Dreams Really Come true?',
    description: 'The answer was within her reach. It was hidden in a box and now that box sat directly in front of her. ',
    public: true,
    user_id: 4,
    tag_id: [2,5]
  },
  {
    title: 'Riding a Bike',
    description: 'The house was located at the top of the hill at the end of a winding road.',
    public: false,
    user_id: 1,
    tag_id: [3]
  },
  {
    title: 'White Cables',
    description: 'Her eyebrows were a shade darker than her hair.',
    public: true,
    user_id: 1,
    tag_id: [5]
  },
  {
    title: 'Should we watch this?',
    description: 'There were a variety of ways to win the game. James had played it long enough to know most of them and he could see what his opponent was trying to do. There was a simple counterattack that James could use and the game should be his. He began deploying it with the confidence of a veteran player who had been in this situation a thousand times in the past. So, it was with great surprise when his opponent used a move he had never before seen or anticipated to easily defeat him in the game.',
    public: true,
    user_id: 1,
    tag_id: [1]
  },
];

const seedDreams = () => Dream.bulkCreate(dreamData);

module.exports = seedDreams;
