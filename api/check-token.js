const express = require('express')
const bodyParser = require('body-parser')

const { checkToken } = require('../utils')

const app = express()
module.exports = app

app.use(bodyParser.json())

app.post('*', (req, res) => {
  if (req.body == null) return res.status(400).send({ error: 'no JSON object in the request' })
  
  const JSONRes = { token: checkToken(process.env.JWT_SECRET, req.body.token) }

  res.set('Content-Type', 'application/json')
  res.status(200).send(JSON.stringify(JSONRes, null, 4))
})

app.all('*', (req, res) => {
  res.status(405).send({ error: 'only POST requests are accepted' })
})