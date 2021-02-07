const Router = require("koa-router")
const { verifyUser, verifyUserLogin, handlePassword } = require("../middleware/user.middleware")

const userRouter = new Router({ prefix: "/user" })

const { create, login } = require('../controller/user.controller')

userRouter.post('/', verifyUser, handlePassword, create)
userRouter.post('/login', verifyUserLogin, handlePassword, login)

module.exports = userRouter