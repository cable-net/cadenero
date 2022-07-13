const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const app = require('../app')
chai.use(chaiHttp)

describe('Integration Test', () => {
  it('Gets status health from endpoint', (done) => {
    chai
      .request(app)
      .get('/api/health/status')
      .end((_err, res) => {
        assert.equal(res.statusCode, 200)
        assert.equal(res.body.status, 'ok')
        done()
      })
  })
})
