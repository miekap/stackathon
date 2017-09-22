const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Artist = db.define('artist', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Artist

Artist.prototype.correctPassword = function (candidatePwd) {
  return Artist.encryptPassword(candidatePwd, this.salt) === this.password
}

Artist.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

Artist.encryptPassword = function (plainText, salt) {
  return crypto.createHash('sha1').update(plainText).update(salt).digest('hex')
}

const setSaltAndPassword = artist => {
  if (artist.changed('password')) {
    artist.salt = Artist.generateSalt()
    artist.password = Artist.encryptPassword(artist.password, artist.salt)
  }
}

Artist.beforeCreate(setSaltAndPassword)
Artist.beforeUpdate(setSaltAndPassword)
