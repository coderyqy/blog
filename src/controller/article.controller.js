const articleService = require("../service/article.service")

class ArticleController {
  async create (ctx, next) {
    const { title, content } = ctx.request.body
    const userId = ctx.user.id
    try {
      const result = await articleService.create(title, content, userId)
      console.log(result)
      ctx.body = {
        status: 1,
        msg: "保存成功",
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getAllArticle (ctx, next) {
    try {
      const result = await articleService.getAllArticle()
      console.log(result)
      ctx.body = {
        result
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getArticle (ctx, next) {
    const id = ctx.params.id
    try {
      const result = await articleService.getArticle(id)
      ctx.body = {
        result
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new ArticleController()