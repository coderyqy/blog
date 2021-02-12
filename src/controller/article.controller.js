const articleService = require("../service/article.service")

class ArticleController {
  async create (ctx, next) {
    const { content } = ctx.request.body
    const userId = ctx.user.id
    try {
      const result = await articleService.create(content, userId)
      console.log(result)
      ctx.body = {
        status: 1,
        msg: "保存成功",
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new ArticleController()