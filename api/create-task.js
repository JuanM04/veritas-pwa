const baseExpress = require('../utils/base-express')
const { prisma } = require('../prisma/generated/prisma-client')

module.exports = baseExpress((req, res) => {
  const func = async () => {
    const task = await prisma.createTask(req.body.taskData)

    res.send(task)
  }

  func()
})