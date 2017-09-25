const path = require('path')
const router = require('express').Router()
const {Artist} = require('../db/models')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('../db')
const sessionStore = new SequelizeStore({db})

router.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'public/artist/index.html'))
})

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.artist.findById(id)
    .then(user => {
      done(null, user)
      return null
    })
    .catch(done))

module.exports = router
