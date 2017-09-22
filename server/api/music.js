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
  .then(fan => {
    if (fan) request('http://coldwine.nyc/stackathon/2.%20Come%20Alive.mp3').pipe(res);
    else res.status(404).send('download ID invalid')
  })
  .catch(next)
});

module.exports = router
