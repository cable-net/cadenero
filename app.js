const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

require('dotenv').config()

const app = express()
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.d7vx9.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(uri, options).then(
  () => { console.warn('Base de datos conectada') },
  err => { console.warn('error db:', err) }
)

const healthRoutes = require('./routes/health')
const authRoutes = require('./routes/auth')
const authRoutesAuthProtected = require('./routes/auth-protected')
const verifyToken = require('./routes/validate-token')

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/auth', verifyToken, authRoutesAuthProtected)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.warn(`servidor andando en: ${PORT}`)
})

module.exports = app
