const router = require('express').Router()
const {Night} = require('../db/models')

router.get('/', (req, res, next) => {
  Night.findAll({
    limit: 1,
    order: [[ 'createdAt', 'DESC' ]]
  })
  .then(nights => res.send(nights[0]))
  .catch(next);
})

router.post('/', (req, res, next) => {
  Night.create(req.body)
  .then(night => res.status(201).send(night))
  .catch(next);
})

router.put('/end', (req, res, next) => {
  return Night.findOne({
    where: req.body
  })
  .then(night =>
    night.update({
      active: false
    })
  )
  .then(night => res.status(201).send(night))
  .catch(next);
})

module.exports = router
