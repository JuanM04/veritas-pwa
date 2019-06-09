const baseExpress = require('../utils/base-express')
const { prisma } = require('../prisma/generated/prisma-client')

module.exports = baseExpress((req, res) => {
  const func = async () => {
    const task = await prisma.updateTask({
      data: req.body.taskData,
      where: { id: req.body.taskId }
    })

    res.send(task)
  }

  func()
})