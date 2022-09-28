const express = require('express')
const router = express.Router()
const Actividad = require('../models/actividad')

router.get('/validate', (req, res) => {
  res.status(200).json({})
})

router.get('/logout', async (req, res) => {
  const actividad = new Actividad({ usuarioId: req.user.id, eventType: 'LOGOUT' })
  try {
    await actividad.save()
  } catch (error) {
    console.warn('Esta actividad no se guardo ' + actividad)
  }
  res.status(200).json({})
})

router.get('/refresh', async (req, res) => {
  const actividad = new Actividad({ usuarioId: req.user.id, eventType: 'REFRESH' })
  try {
    await actividad.save()
  } catch (error) {}
  res.status(200).json({})
})

module.exports = router
