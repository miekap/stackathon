const Sequelize = require('sequelize')
const db = require('../db')

const Night = db.define('night', {
  eventId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = Night
