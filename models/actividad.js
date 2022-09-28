const mongoose = require('mongoose')

const actividadSchema = mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  eventType: {
    type: String,
    required: true,
    enum: ['LOGIN', 'LOGOUT', 'REFRESH']
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Actividad', actividadSchema)
