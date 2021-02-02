const Router = require("koa-router")
const { verifyUser, handlePassword } = require("../middleware/user.middleware")

const userRouter = new Router({ prefix: "/user" })

const { create } = require('../controller/user.controller')

userRouter.post('/', verifyUser, handlePassword, create)

module.exports = userRouter