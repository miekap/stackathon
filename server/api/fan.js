const router = require('express').Router()
const {Fan} = require('../db/models')

router.get('/:nightId', (req, res, next) => {
  Fan.findAll({
    where: {
      nightId: req.params.nightId
    }
  })
    .then(fans => res.json(fans))
    .catch(next)
})

router.post('/', (req, res, next) => {
  return Fan.findOne({
    where: {
      randomId: req.body.randomId,
      nightId: req.body.nightId
    }
  })
  .then(fan => {
    return fan
      ? fan.update({
          music: req.body.music
        })
      : Fan.create(req.body)
  })
  .then(fan => res.status(201).send(fan))
  .catch(next);
})

router.put('/allow', (req, res, next) => {
  return Fan.findOne({
    where: req.body
  })
  .then(fan => {
    console.log('db fan: ', fan)
    return fan.update({
      downloadAllowed: true
    })
  })
  .then(fan => res.status(201).send(fan))
  .catch(next);
})


module.exports = router
