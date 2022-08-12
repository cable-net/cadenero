const chai = require('chai')
const expect = chai.expect
const adapters = require('../../adapters/login')

describe('Pruebas para el adapter de login: ', () => {
  describe('Adapter para login endpoint: ', () => {
    it('Deberia retornar un model porque los datos estan bien', () => {
      const body = {
        email: 'a45srgh@gmail.com',
        password: '876a780ih'
      }
      const [error, model] = adapters.bodyToLogin(body)
      expect(error).to.equal(undefined)
      expect(model).to.deep.equal({
        email: 'a45srgh@gmail.com',
        password: '876a780ih'
      })
    })
    it('Deberia retornar un error porque el password no se encuentra', () => {
      const body = {
        email: 'a45srgh@gmail.com'
      }
      const [error, model] = adapters.bodyToLogin(body)
      expect(model).to.equal(undefined)
      expect(error.details[0].message).to.equal('"password" is required')
    })
  })
  it('Deberia retornar un error porque el password no cumple con el formato', () => {
    const body = {
      email: 'a45srgh@gmail.com',
      password: '1q2'
    }
    const [error, model] = adapters.bodyToLogin(body)
    expect(model).to.equal(undefined)
    expect(error.details[0].message).to.equal('"password" length must be at least 6 characters long')
  })
  it('Deberia retornar un error porque falta el email', () => {
    const body = {
      password: '1q2'
    }
    const [error, model] = adapters.bodyToLogin(body)
    expect(model).to.equal(undefined)
    expect(error.details[0].message).to.equal('"email" is required')
  })
  it('Deberia retornar porque el email no cumple con el formto', () => {
    const body = {
      email: 'a4'
    }
    const [error, model] = adapters.bodyToLogin(body)
    expect(model).to.equal(undefined)
    expect(error.details[0].message).to.equal('"email" length must be at least 6 characters long')
  })
})
