const Sequelize = require('sequelize')
const db = require('../db')

const Interaction = db.define('interaction', {
  fanId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = Interaction
