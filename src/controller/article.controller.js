const articleService = require("../service/article.service")

class ArticleController {
  async create (ctx, next) {
    console.log("创建动态")
    try {
      const result = await articleService.create(content, userId)
      console.log(result)
      ctx.body = result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new ArticleController()