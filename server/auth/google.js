const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {Artist} = require('../db/models')
module.exports = router

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
}

const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
  const googleId = profile.id
  const name = profile.displayName
  const email = profile.emails[0].value

  Artist.find({where: {googleId}})
    .then(artist => {
      artist
        ? done(null, artist)
        : Artist.create({name, email, googleId})
          .then(newArtist => done(null, newArtist))
      return null
    })
    .catch(done)
})

passport.use(strategy)

router.get('/', passport.authenticate('google', {scope: 'email'}))

router.get('/oauth2callback', passport.authenticate('google', {
  successRedirect: '/admin',
  failureRedirect: '/admin'
}))
