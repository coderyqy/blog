const Router = require("koa-router")
const { create, getAllArticle, getArticle, update, fileInfo, fileInfoMainPicture } = require("../controller/article.controller")
const { verifyAuth } = require("../middleware/auth.middleware")


const articleRouter = new Router({ prefix: "/article" })

articleRouter.post('/save', verifyAuth, create)
articleRouter.get('/', verifyAuth, getAllArticle)
articleRouter.get('/:id/getArticle', verifyAuth, getArticle)
articleRouter.post('/update/:id', verifyAuth, update)

// 获取文章图片
articleRouter.get('/image/:filename', fileInfo)

// 获取文章主图
articleRouter.get('/theme/:filename', fileInfoMainPicture)

module.exports = articleRouter