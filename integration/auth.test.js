const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const app = require('../app')
chai.use(chaiHttp)

describe('Pruebas de integracion para un nuevo usuario', () => {
  it('Registro Exitoso', (done) => {
    const usuario = {
        email: "a45srgh@gmail.com",
        password: "123456",
        user_id: "ab123456",
        user_type: "colaborador",
        role: "A"
    }
    chai
      .request(app)
      .post('/api/auth/register')
      .send(usuario)
      .end((_err, res) => {
        assert.equal(res.statusCode, 201)
        assert.isEmpty(res.body)
        done()
      })
  })
})
