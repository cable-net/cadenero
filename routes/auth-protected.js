const express = require('express')
const router = express.Router()
const Actividad = ('../models/actividad')

router.get('/validate', (req, res) => {
  res.status(200).json({})
})

router.get('/logout', (req, res) => {
  console.log(req.user.id) 
  res.status(200).json({})
})

router.get('/refresh', (req, res) => {
  console.log(req.user.id) 
  res.status(200).json({})
})

module.exports = router
