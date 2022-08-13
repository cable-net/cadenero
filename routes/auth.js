const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuario')
const adapter = require('../adapters/usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adapters = require('../adapters/login')

router.post('/register', async (req, res) => {
  const [error, model] = adapter.bodyToModel(req.body)
  if (error) {
    return res.status(400).json(
      { error: 'Datos invalidos' }
    )
  }

  const isEmailExist = await Usuario.findOne({ email: req.body.email })
  if (isEmailExist) {
    return res.status(400).json(
      { error: 'Verifique sus datos' }
    )
  }

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(req.body.password, salt)
  model.password = passwordHash
  const usuario = new Usuario(model)
  try {
    const savedUsuario = await usuario.save()
    res.status(201).json(savedUsuario)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.post('/login', async (req, res) => {
  const [error, model] = adapters.bodyToLogin(req.body)
  if (error) {
    return res.status(400).json(
      { error: 'Verifique sus datos' }
    )
  }
  const usuario = await Usuario.findOne({ email: model.email })
  if (!usuario) return res.status(400).json({ error: 'Verifique sus datos' })

  const validPassword = await bcrypt.compare(model.password, usuario.password)
  if (!validPassword) return res.status(400).json({ error: 'Verifique sus datos' })

  const tokenJwt = jwt.sign({
    nombre: usuario.nombre,
    id: usuario._id
  }, process.env.TOKEN_SECRET)

  res.header('auth-token', tokenJwt).status(200).json({
    token: tokenJwt
  })
})

router.get('/email/:email/registered', async (req, res) => {
  const emailParams = req.params.email

  try {
    const isEmailExist = await Usuario.findOne({ email: emailParams })
    if (isEmailExist) {
      res.status(200).json({ })
    } else {
      res.status(404).json({ })
    }
  } catch (error) {
    res.status(500).json({ })
  }
})

module.exports = router
