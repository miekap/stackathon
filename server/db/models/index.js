const User = require('./user');
const Night = require('./night');
const Interaction = require('./interaction');

Interaction.belongsTo(Night);
Night.hasMany(Interaction);

module.exports = {
  User,
  Night,
  Interaction
}
