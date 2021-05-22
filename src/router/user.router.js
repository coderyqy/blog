const Router = require("koa-router")
const { verifyUser, verifyUserLogin, handlePassword } = require("../middleware/user.middleware")

const userRouter = new Router({ prefix: "/user" })

const { create, login, getAllFontEndUsers, deleteFontEndUser } = require('../controller/user.controller')

// 创建用户
userRouter.post('/', verifyUser, handlePassword, create)
// 登录
userRouter.post('/login', verifyUserLogin, handlePassword, login)
// 前端用户
// 获取所有用户
userRouter.get('/ulist', getAllFontEndUsers)
// 删除用户
userRouter.get('/deleteUser/:userId', deleteFontEndUser)

module.exports = userRouter