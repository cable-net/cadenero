const chai = require('chai')
const expect = chai.expect
const logic = require('../../logic/auth')

describe('Pruebas para el logic de auth: ', () => {
  describe('Logic para obtener el expired del token: ', () => {
    it('Deberia retornar un expired mayor que Date por 1 hora', () => {
      const d = new Date()
      const expiresIn = logic.calculatedExpiresIn(d, 1)
      expect(expiresIn).to.be.below(d.getTime())
    })
  })
})
