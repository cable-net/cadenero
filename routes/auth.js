const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)

  const usuario = new Usuario({
    email: req.body.email,
    password: password,
    userId: req.body.user_id,
    userType: req.body.user_type,
    role: req.body.role
  })
  try {
    await usuario.save()
    res
      .status(201)
      .json({ })
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router
