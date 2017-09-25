const router = require('express').Router()
const request = require('request');
const { Fan } = require('../db/models');

router.get('/:night/:fan', (req, res, next) => {
  Fan.findOne({
    where: {
      randomId: req.params.fan,
      nightId: req.params.night
    }
  })
  .then(fan =>
    fan
      ? fan.update({
          downloads: fan.dataValues.downloads + 1
        })
      : res.status(404).send('download ID invalid')
  )
  .then(fan =>
    (fan && fan.dataValues.downloads < 7)
      ? request('http://coldwine.nyc/stackathon/2.%20Come%20Alive.mp3').pipe(res)
      : res.status(404).send('download ID invalid')
  )
  .catch(next)
})

module.exports = router
