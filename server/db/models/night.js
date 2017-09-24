const Sequelize = require('sequelize')
const db = require('../db')

const Night = db.define('night', {
  randomId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  lat: {
    type: Sequelize.DECIMAL
  },
  lng: {
    type: Sequelize.DECIMAL
  },
  accuracy: {
    type: Sequelize.DECIMAL
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Night
