const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const Usuario = require('../models/usuario')

describe('api/users', () => {
  before(async () => {
    // before each test delete all users table data
    await Usuario.deleteMany({})
  })

  after(async () => {
    mongoose.disconnect()
  })

  describe('POST /', () => {
    it('should return user when the all request body is valid', async () => {
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
  })
})
