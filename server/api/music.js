const router = require('express').Router()
const request = require('request');
const { Interaction } = require('../db/models');

router.get('/:night/:fan', (req, res, next) => {
  Interaction.findOne({
    where: {
      nightId: req.params.night,
      fanId: req.params.fanId
    }
  })
  .then(interaction => {
    if (interaction) request('http://coldwine.nyc/stackathon/2.%20Come%20Alive.mp3').pipe(res);
    else res.status(404).send('download code invalid')
  })
  .catch(next)
});

module.exports = router
