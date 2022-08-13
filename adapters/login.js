const Joi = require('@hapi/joi')

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(100).required()
})

module.exports.bodyToLogin = function (body) {
  const { error } = schemaLogin.validate(body)
  if (error) {
    return [error]
  }
  const model = {
    email: body.email,
    password: body.password
  }
  return [error, model]
}
