const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')

const { prisma } = require('../prisma/generated/prisma-client')
const { checkToken } = require('../utils')

const app = express()
module.exports = app

app.use(bodyParser.json())

app.post('*', (req, res) => {
  if (req.body == null) return res.status(400).send({ error: 'no JSON object in the request' })
  if (!req.body.token || !checkToken(process.env.JWT_SECRET, req.body.token)) return res.status(405).send({ error: 'invalid token' })
  res.set('Content-Type', 'application/json')

  const func = async () => {
    const tasks = await prisma.tasks({
      where: {
        AND: [
          { date_gte: moment().startOf('day')._d },
          { OR: [
            { group: 'CLASSROOM' },
            { group: req.body.group }
          ] }
        ]
      },
      orderBy: 'date_ASC'
    })
    res.status(200).send(JSON.stringify(tasks, null, 4))
  }
  func()
})

app.all('*', (req, res) => {
  res.status(405).send({ error: 'only POST requests are accepted' })
})