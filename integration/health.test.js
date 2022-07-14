const chai = require('chai')
const expect = chai.expect
const request = require('supertest')

const app = require('../app')

describe('Integration Test', () => {
  it('Gets status health from endpoint', async () => {
    const res = await request(app).get('/api/health/status')
    expect(res.status).to.equal(200)
    expect(res.body.status).to.equal('ok')
  })
})
