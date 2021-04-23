const fs = require('fs')

const articleService = require("../service/article.service")
const fileService = require("../service/file.service")
const labelService = require("../service/label.service")
const { PICTURE_PATH, MAIN_PICTURE_PATH } = require('../constants/file-path')

class ArticleController {
  async create (ctx, next) {
    const { title, condec, content, filename, mimetype, checkList } = ctx.request.body
    const userId = ctx.user.id
    try {
      // 插入文章
      const result = await articleService.create(title, condec, content, filename, mimetype, userId)
      const articleId = result[0].insertId

      // 设置所属标签
      let labelNameInfo = ''
      let labelNameId = ''
      for (let name of checkList) {
        labelNameInfo = await labelService.getLabelByName(name)
        labelNameId = labelNameInfo[0].id
        labelService.setArticleLabel(articleId, labelNameId, name)
      }
      // 返回信息
      ctx.body = {
        status: 200,
        message: "保存成功",
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
    const { title, condec, content, filename, mimetype } = ctx.request.body
    console.log(content)
    try {
      const result = await articleService.update(id, title, condec, content, filename, mimetype)
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

  async deleteArticle (ctx, next) {
    const { id } = ctx.params
    console.log(id)
    try {
      const result = await articleService.deleteArticle(id)
      ctx.body = {
        status: 200,
        message: "删除成功！"
      }
    } catch (error) {
      ctx.body = {
        status: 400,
        message: "删除失败！"
      }
      console.log(error)
    }
  }

  // 显示图片
  async fileInfo (ctx, next) {
    let { filename } = ctx.params
    const fileInfo = await fileService.getFileByFilename(filename)
    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }

  // 增加文章时回显图片
  async fileAddInfo (ctx, next) {
    console.log("增加文章时回显图片")
    let { filename, mimetype } = ctx.params
    console.log(mimetype)
    ctx.response.set('content-type', mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }

  // 显示主图
  async fileInfoMainPicture (ctx, next) {
    let { filename } = ctx.params
    const fileInfo = await fileService.getMainPicByFilename(filename)
    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${MAIN_PICTURE_PATH}/${filename}`)
  }

}

module.exports = new ArticleController()