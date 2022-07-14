const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const Usuario = require('../models/usuario')

describe('Pruebas para la autenticacion en la plataforma', () => {
  before(async () => {
    // before each test delete all users table data
    await Usuario.deleteMany({})
  })

  after(async () => {
    mongoose.disconnect()
  })

  describe('Endpoint de registro', () => {
    it('deberia retornar un usuario con un id y una fecha de registro en la BD', async () => {
      const usuario = {
        email: 'a45srgh@gmail.com',
        password: '1q2w3e4r',
        user_id: '62ce8f01c62c6a277bba2e31',
        user_type: 'cliente',
        role: 'SUPERVISOR'
      }
      const res = await request(app).post('/api/auth/register').send(usuario)
      expect(res.status).to.equal(201)
      expect(res.body).to.have.include.keys('_id', 'date')
    })

    it('deberia retornar un error porque el email ya existe', async () => {
      const usuario = {
        email: 'a45srgh@gmail.com',
        password: '1q2w3e4r',
        user_id: '62ce8f01c62c6a277bba2e31',
        user_type: 'cliente',
        role: 'SUPERVISOR'
      }
      const res = await request(app).post('/api/auth/register').send(usuario)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('Verifique sus datos')
    })
  })
})
