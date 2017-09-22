const router = require('express').Router()
module.exports = router

router.use('/artist', require('./artist'))
router.use('/music', require('./music'))
router.use('/night', require('./night'))
router.use('/fan', require('./fan'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
