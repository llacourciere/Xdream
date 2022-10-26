const User = require('./User');
const Dream = require('./Dream');
const Comment = require('./Comment');

User.hasMany(Dream, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Dream.belongsTo(User, {
    foreignKey: 'user_id'
});

Dream.hasMany(Comment, {
    foreignKey: 'dream_id'
});


Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Dream, {
   foreignKey: 'dream_id'
});



module.exports = { User, Dream, Comment}