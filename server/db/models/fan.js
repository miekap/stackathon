const Sequelize = require('sequelize')
const db = require('../db')

const Fan = db.define('fan', {
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
  }
})

module.exports = Fan
