const chai = require('chai')
const expect = chai.expect
const request = require('supertest')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTVmZDEzODJlYWMwMmQ3NWI4ZGE3NCIsImlhdCI6MTY1OTIzOTcwMH0.AV5WVSIY63cRGMDcJEHFFHVuPiALwcJAJuSt3oS962o'

const app = require('../app')

describe('Prueba de endpoint', () => {
  it('Comprobando la conexión del endpoint validate', async () => {
    const res = await request(app).get('/api/auth/validate').set('auth-token', token)
    expect(res.status).to.equal(200)
    expect(res.body).to.be.empty
  })
})

describe('Prueba de endpoint', () => {
  it('Comprobando la conexión del endpoint logout', async () => {
    const res = await request(app).get('/api/auth/logout').set('auth-token', token)
    expect(res.status).to.equal(200)
    expect(res.body).to.be.empty
  })
})

describe('Prueba de endpoint', () => {
  it('Comprobando la conexión del endpoint refresh', async () => {
    const res = await request(app).get('/api/auth/refresh').set('auth-token', token)
    expect(res.status).to.equal(200)
    expect(res.body).to.be.empty
  })
})
