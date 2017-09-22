const router = require('express').Router()
const {Artist} = require('../db/models')

router.get('/', (req, res, next) => {
  Artist.findAll({
    attributes: ['id', 'email']
  })
    .then(artists => res.json(artists))
    .catch(next)
})

module.exports = router
