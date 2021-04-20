const articleService = require("../service/article.service")

class ArticleController {
  async create (ctx, next) {
    console.log("123123-----")
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
        result: result[0]
      }
    } catch (error) {
      console.log(error)
    }
  }

  async update (ctx, next) {
    const { id } = ctx.params
    const { title, content } = ctx.request.body
    console.log(content)
    try {
      const result = await articleService.update(id, title, content)
      ctx.body = {
        status: 200,
        message: "修改成功！"
      }
    } catch (error) {
      ctx.body = {
        status: 400,
        message: "修改失败！"
      }
      console.log(error)
    }
  }
}

module.exports = new ArticleController()