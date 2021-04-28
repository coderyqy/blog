const commentService = require("../service/comment.service")
const userService = require("../service/user.service")

class commentController {
  // 发布评论
  async create (ctx, next) {
    const { articleId } = ctx.params
    const { name, content } = ctx.request.body
    // 查找用户
    let userId = ''
    const userInfo = await userService.getFontEndUserByName(name)
    if (userInfo.length == 0) {
      // 创建用户
      const result = await userService.createFontEndUser(name)
      userId = result.insertId

    } else {
      userId = userInfo[0].id
    }
    // 创建评论
    const result = await commentService.create(content, articleId, userId)
    ctx.body = result
  }
}

module.exports = new commentController()