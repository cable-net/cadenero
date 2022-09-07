module.exports.calculatedExpiresIn = function (expiresInHrs) {
  const d = new Date()
  return (((d.getTime()) + (expiresInHrs * 60 * 60 * 1000)) - (d.getTime() - d.getMilliseconds()) / 1000)
}
