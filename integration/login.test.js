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

  describe('Endpoint de login', () => {
    it('deberia retornar el token del usuario', async () => {
      const register = {
        email: 'pruebalogin@gmail.com',
        password: '1q2w3e4r',
        user_id: '62ce8f01c62c6a277bba2e31',
        user_type: 'cliente',
        role: 'SUPERVISOR'
      }
      await request(app).post('/api/auth/register').send(register)
      const usuario = {
        email: 'pruebalogin@gmail.com',
        password: '1q2w3e4r'
      }
      const res = await request(app).post('/api/auth/login').send(usuario)
      expect(res.status).to.equal(200)
      expect(res.body).to.have.include.keys('token')
    })

    it('deberia retornar un error si el password es muy pequeno', async () => {
      const usuario = {
        email: 'a457777@gmail.com',
        password: '1q2w'
      }
      const res = await request(app).post('/api/auth/login').send(usuario)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('Verifique sus datos')
    })

    it('deberia retornar un error si el email no existe', async () => {
      const usuario = {
        email: 'otro@gmai.com',
        password: '1q2w56a'
      }
      const res = await request(app).post('/api/auth/login').send(usuario)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('Verifique sus datos')
    })

    it('deberia retornar un error porque el usuario existe pero el password es incorrecto', async () => {
      const register = {
        email: 'pruebafail@gmail.com',
        password: 'phfhru234',
        user_id: '62ce8f01c62c6a277bba2e31',
        user_type: 'cliente',
        role: 'SUPERVISOR'
      }
      await request(app).post('/api/auth/register').send(register)
      const usuario = {
        email: 'pruebafail@gmail.com',
        password: '1q2w56a'
      }
      const res = await request(app).post('/api/auth/login').send(usuario)
      expect(res.status).to.equal(400)
      expect(res.body.error).to.equal('Verifique sus datos')
    })
  })
})
