const express = require('express')
const router = express.Router()

router.get('/validate', (req, res) => {
  res.status(200).json({})
})

router.get('/logout', (req, res) => {
  res.status(200).json({})
})

router.get('/refresh', (req, res) => {
  res.status(200).json({})
})

module.exports = router
