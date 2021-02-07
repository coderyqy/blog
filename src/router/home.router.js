const Router = require("koa-router")

const homeRouter = new Router({ prefix: "/home" })

const { getHomeData } = require('../controller/home.controller')

homeRouter.get('/', getHomeData)

module.exports = homeRouter
