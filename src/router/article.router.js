const Router = require("koa-router")
const { create } = require("../controller/article.controller")
const { verifyAuth } = require("../middleware/auth.middleware")


const articleRouter = new Router({ prefix: "/article" })

articleRouter.post('/', verifyAuth, create)

module.exports = articleRouter