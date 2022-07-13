const express = require('express')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()

const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.d7vx9.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.warn('Base de datos conectada'))
  .catch(e => console.warn('error db:', e))

const healthRoutes = require('./routes/health')
const authRoutes = require('./routes/auth')

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.warn(`servidor andando en: ${PORT}`)
})

module.exports = app
