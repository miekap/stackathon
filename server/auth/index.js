const router = require('express').Router()
const {Artist} = require('../db/models')
module.exports = router

router.post('/login', (req, res, next) => {
  Artist.findOne({where: {email: req.body.email}})
    .then(artist => {
      if (!artist) {
        res.status(401).send('Artist not found')
      } else if (!artist.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(artist, err => err ? next(err) : res.json(artist))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  Artist.create(req.body)
    .then(artist => {
      req.login(artist, err => err ? next(err) : res.json(artist))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError')
        res.status(401).send('Artist already exists')
      else next(err)
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
