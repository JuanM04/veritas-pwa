const { checkToken } = require('./index')

module.exports = (middleware, validateToken=false) => {
  const express = require('express')
  const bodyParser = require('body-parser')
  const app = express()

  app.use(bodyParser.json())

  app.post('*', (req, res) => {
    if (req.body == null) return res.status(400).send({ error: 'no JSON object in the request' })
    if (
      validateToken
      &&
      (
        !req.body.token
        ||
        !checkToken(process.env.JWT_SECRET, req.body.token)
      )
    ) return res.status(405).send({ error: 'invalid token' })
    res.set('Content-Type', 'application/json')
    
    middleware(req, res)
  })

  app.all('*', (req, res) => {
    res.status(405).send({ error: 'only POST requests are accepted' })
  })

  return app
}