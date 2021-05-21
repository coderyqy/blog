const commentService = require("../service/comment.service")
const userService = require("../service/user.service")

class commentController {
  // 获取所有文章的评论
  async getAllArticleComment (ctx, next) {
    const result = await commentService.getAllComment()
    ctx.body = result
  }

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
    // 返回该文章的所有评论
    const commentlist = await commentService.getArticleComment(articleId)
    ctx.body = commentlist
    next()
  }

  // 回复评论
  async replyComment (ctx, next) {
    const { articleId } = ctx.params
    const { name, content, commentId } = ctx.request.body
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
    // 回复评论
    await commentService.reply(content, articleId, userId, commentId)
    // 返回该文章的所有评论
    const commentlist = await commentService.getArticleComment(articleId)
    ctx.body = commentlist
    next()
  }

  // 获取文章的所有评论
  async getArticleCommentList (ctx, next) {
    try {
      const { articleId } = ctx.params
      const result = await commentService.getArticleComment(articleId)
      ctx.body = result
      next()
    } catch (error) {
      console.log(error)
    }
  }

  // 获取被评论的人的名字
  async getReplyUserName (ctx, next) {
    try {
      const { commentId } = ctx.params
      const result = await commentService.getReplyUserNameByCommentId(commentId)
      const name = result[0].commentuser.name
      ctx.body = {
        name
      }
      next()
    } catch (error) {
      console.log(error)
    }
  }

  // 删除评论
  async deleteComment (ctx, next) {
    try {
      const { commentId } = ctx.params
      const result = await commentService.deleteCommentByCommentId(commentId)
      ctx.body = {
        status: 200,
        message: '删除成功'
      }
      next()
    } catch (error) {
      ctx.body = {
        status: 500,
        message: '删除失败'
      }
      console.log(error)
    }
  }
}

module.exports = new commentController()