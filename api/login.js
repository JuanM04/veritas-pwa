const baseExpress = require('../utils/base-express')
const { getToken } = require('../utils')

module.exports = baseExpress((req, res) => {
  const JSONRes = { token: req.body.password === process.env.PASSWORD ? getToken(process.env.JWT_SECRET, req.body.token) : false }

  res.send(JSONRes)
})