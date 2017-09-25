const router = require('express').Router()
const request = require('request')
const { Fan } = require('../db/models')
const download = require('../../download')


const hostSite = 'http://coldwine.nyc/stackathon/'

router.get('/:night/:fan/:song', (req, res, next) => {
  Fan.findOne({
    where: {
      randomId: req.params.fan,
      nightId: req.params.night
    }
  })
  .then(fan =>
    fan
      ? request(`${hostSite}/${req.params.song}.mp3`).pipe(res)
      : res.status(404).send('download ID invalid')
  )
  .catch(next)
})

module.exports = router






