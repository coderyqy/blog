const Router = require("koa-router")

const labelRouter = new Router({ prefix: "/label" })

const { getAllLabel } = require('../controller/label.controller')

labelRouter.get('/', getAllLabel)

module.exports = labelRouter
