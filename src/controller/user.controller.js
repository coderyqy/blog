const userService = require('../service/user.service')

class UserController {
  async create (ctx, next) {
    // 获取用户请求的数据
    const user = ctx.request.body
    console.log(user)
    try {
      // 查询数据
      const result = await userService.create(user)
      // 返回数据
      ctx.body = result
    } catch (error) {
      ctx.body = "数据库错误"
      console.log(error)
    }
  }
}

module.exports = new UserController()