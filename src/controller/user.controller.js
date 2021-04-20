const userService = require('../service/user.service')
const { PRIVATE_KEY, PUBLIC_KEY } = require('../app/config')
const jwt = require('jsonwebtoken')

class UserController {
  async create (ctx, next) {
    // 获取用户请求的数据
    const user = ctx.request.body
    try {
      const result = await userService.create(user)
      ctx.body = {
        status: 1,
        msg: "注册成功",
        name: user.name,
        uid: user.uid
      }
    } catch (error) {
      ctx.body = "数据库错误"
      console.log(error)
    }
  }

  async login (ctx, next) {
    console.log("------------")
    const { id, name } = ctx.user
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 有效时间(秒)
      algorithm: "RS256" // 加密算法, 默认是HS256
    })
    ctx.body = { id, name, token }
    await next()
  }
}

module.exports = new UserController()