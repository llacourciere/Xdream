const User = require('./User');
const Dream = require('./Dream');
const Comment = require('./Comment');
const Tag = require('./Tag');
const DreamTag = require('./DreamTag');

User.hasMany(Dream, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

User.belongsToMany(Dream, {
    through: Comment,
    as: 'commented_posts',
    foreignKey: 'user_id'
});

Dream.belongsTo(User, {
    foreignKey: 'user_id'
});

Dream.hasMany(Comment, {
    foreignKey: 'dream_id'
});

Dream.belongsToMany(Tag, {
    through: DreamTag,
    foreignKey: 'dream_id'
});

Tag.belongsToMany(Dream, {
    through: DreamTag,
    foreignKey: 'tag_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Dream, {
    foreignKey: 'dream_id'
});



module.exports = { User, Dream, Comment, Tag, DreamTag}