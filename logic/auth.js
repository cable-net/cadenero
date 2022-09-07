module.exports.calculatedExpiresIn = function (d, expiresInHrs) {
  return (((d.getTime()) + (expiresInHrs * 60 * 60 * 1000)) - (d.getTime() - d.getMilliseconds()) / 1000)
}
