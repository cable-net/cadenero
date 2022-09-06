const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const app = express()
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(cors({
  origin: '*'
}))

const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.d7vx9.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri, options).then(
  () => { console.warn('Base de datos conectada') },
  err => { console.warn('error db:', err) }
)

const healthRoutes = require('./routes/health')
const authRoutes = require('./routes/auth')

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.warn(`servidor andando en: ${PORT}`)
})

module.exports = app
