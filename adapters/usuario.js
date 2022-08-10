const Joi = require('@hapi/joi')

const schemaRegister = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(100).required(),
  user_id: Joi.string().min(24).max(24).required(),
  user_type: Joi.string().valid('cliente', 'colaborador').required(),
  role: Joi.string().valid('TECNICO', 'CAJERO', 'SUPERVISOR', 'CLIENTE').required()
})

module.exports.bodyToModel = function (body) {
  const { error } = schemaRegister.validate(body)
  if (error) {
    return [error]
  }
  const model = {
    email: body.email,
    userId: body.user_id,
    userType: body.user_type,
    role: body.role
  }
  return [error, model]
}
