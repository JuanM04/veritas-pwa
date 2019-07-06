const baseExpress = require('../utils/base-express')
const moment = require('moment-timezone')
const { prisma } = require('../prisma/generated/prisma-client')

module.exports = baseExpress((req, res) => {
  const now = moment.tz('America/Argentina/Buenos_Aires').startOf('day')._d

  const func = async () => {
    const tasks = await prisma.tasks({
      where: {
        AND: [
          {
            OR: [
              { date_gte: now },
              { endDate_gte: now }
            ]
          },
          { OR: [
            { group: 'CLASSROOM' },
            { group: req.body.group }
          ] }
        ]
      },
      orderBy: 'date_ASC'
    })

    res.send(tasks)
  }

  func()
})