const express = require('express')
const app = express()

require('dotenv').config()

const healthRoutes = require('./routes/health')
const authRoutes = require('./routes/auth')

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.warn(`servidor andando en: ${PORT}`)
})

module.exports = app
