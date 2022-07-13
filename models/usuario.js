const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true   
    },
    userType: {
        type: String,
        required: true,
        enum: ['cliente', 'colaborador']
    },
    role: {
        type: String,
        required: true,
        enum: ['TECNICO', 'CAJERO', 'SUPERVISOR', 'CLIENTE']         
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Usuario', usuarioSchema);
