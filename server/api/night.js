const router = require('express').Router()
const {User, Night} = require('../db/models')
const crypto = require('crypto')

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.post('/generate', (req, res, next) => {
  Night.create(req.body)
  .then(night => res.status(201).send(night))
  .catch(next);
})

module.exports = router
