const express = require('express')
const router = express.Router()

router.post('/register', (req, res) => {
  res
  .status(201)
  .json({})
})

module.exports = router
