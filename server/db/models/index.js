const Artist = require('./artist');
const Night = require('./night');
const Fan = require('./fan');

Fan.belongsTo(Night);
Night.hasMany(Fan);

module.exports = {
  Artist,
  Night,
  Fan
}
