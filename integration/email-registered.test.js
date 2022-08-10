const chai = require('chai')
const expect = chai.expect
const request = require('supertest')

const app = require('../app')
const Usuario = require('../models/usuario')

describe('Pruebas para la autenticacion en la plataforma', () => {
  before(async () => {
    // before each test delete all users table data
    await Usuario.deleteMany({})
  })

  after(async () => {

  })

  describe('Endpoint para verificar si el email ya esta registrado', () => {
    it('deberia retornar 200 porque el email ya existe', async () => {
      const register = {
        email: 'pruebaemail@gmail.com',
        password: '1q2w3e4r',
        user_id: '62ce8f01c62c6a277bba2e31',
        user_type: 'cliente',
        role: 'SUPERVISOR'
      }
      await request(app).post('/api/auth/register').send(register)
      const res = await request(app).get('/api/auth/email/pruebaemail@gmail.com/registered')
      expect(res.status).to.equal(200)
    })
    it('deberia retornar 404 porque el email no existe', async () => {
      const res = await request(app).get('/api/auth/email/pruebaemailfail23@gmail.com/registered')
      expect(res.status).to.equal(404)
    })
  })
})
