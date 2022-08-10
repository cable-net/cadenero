const chai = require("chai")
const expect = chai.expect
const adapter = require("../../adapters/usuario")

describe("Pruebas para el adapter de usuario: ", () => {
  describe("Adapter para register endpoint: ", () => {
    it("Deberia retornar un modelo de tipo usuario", () => {
      const body = {
        email: 'a45srgh@gmail.com',
        password: '1q2w3e4r',
        user_id: '62ce8f01c62c6a277bba2e31',
        user_type: 'cliente',
        role: 'SUPERVISOR'
      }
      const [_error, model] = adapter.bodyToModel(body)
      expect(model).to.deep.equal({
        email: 'a45srgh@gmail.com',
        userId: '62ce8f01c62c6a277bba2e31',
        userType: 'cliente',
        role: 'SUPERVISOR'
      })
    })
    it("Deberia retornar un error porque el password no se encuentra", () => {
      const body = {
        email: 'a45srgh@gmail.com',
        user_id: '62ce8f01c62c6a277bba2e31',
        user_type: 'cliente',
        role: 'SUPERVISOR'
      }
      const [error, _model] = adapter.bodyToModel(body)
      expect(error.details[0].message).to.equal('"password" is required')
    })
  })
})
