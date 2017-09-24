const router = require('express').Router()
const {Fan} = require('../db/models')

router.get('/', (req, res, next) => {
  Fan.findAll()
    .then(fans => res.json(fans))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Fan.create(req.body)
  .then(fan => res.status(201).send(fan))
  .catch(next);
})

module.exports = router
