const userService = require('../service/user.service')
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
    // 1.验证用户名和密码是否为空
    // 2.加密密码,对不对的上
    const user = ctx.request.body
    const result = await userService.getUserByName(user.name)
    console.log(result[0].password)
    if (result.length) {
      if (result[0].password == user.password) {
        // 3.返回用户信息和token
      }
    }
  }
}

module.exports = new UserController()