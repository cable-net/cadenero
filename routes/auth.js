const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')

const schemaRegister = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(100).required(),
  user_id: Joi.string().min(24).max(24).required(),
  user_type: Joi.string().valid('cliente', 'colaborador').required(),
  role: Joi.string().valid('TECNICO', 'CAJERO', 'SUPERVISOR', 'CLIENTE').required()
})

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(100).required()
})

router.post('/register', async (req, res) => {
  const { error } = schemaRegister.validate(req.body)
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
  const usuario = new Usuario({
    email: req.body.email,
    password: passwordHash,
    userId: req.body.user_id,
    userType: req.body.user_type,
    role: req.body.role
  })
  try {
    const savedUsuario = await usuario.save()
    res.status(201).json(savedUsuario)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.post('/login', async (req, res) => {
  const { error } = schemaLogin.validate(req.body)
  if (error) return res.status(400).json({ error: 'Verifique sus datos' })

  const usuario = await Usuario.findOne({ email: req.body.email })
  if (!usuario) return res.status(400).json({ error: 'Verifique sus datos' })

  const validPassword = await bcrypt.compare(req.body.password, usuario.password)
  if (!validPassword) return res.status(400).json({ error: 'Verifique sus datos' })

  const tokenJwt = jwt.sign({
    nombre: usuario.nombre,
    id: usuario._id
  }, process.env.TOKEN_SECRET)

  res.header('auth-token', tokenJwt).status(200).json({
    token: tokenJwt
  })
})

module.exports = router
