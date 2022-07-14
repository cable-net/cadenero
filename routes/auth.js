const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  const isEmailExist = await Usuario.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.status(400).json(
        {error: 'Verifique sus datos'}
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

module.exports = router
