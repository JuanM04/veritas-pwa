const baseExpress = require('../utils/base-express')
const { checkToken } = require('../utils')

module.exports = baseExpress((req, res) => {
  const JSONRes = { token: checkToken(process.env.JWT_SECRET, req.body.token) }

  res.send(JSONRes)
})