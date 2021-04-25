const Router = require("koa-router")

const {
  create,
  getAllArticle,
  getArticle,
  getArticleByLabelName,
  update,
  deleteArticle,
  fileInfo,
  fileAddInfo,
  fileInfoMainPicture
} = require("../controller/article.controller")

const { verifyAuth } = require("../middleware/auth.middleware")

const articleRouter = new Router({ prefix: "/article" })

// 增加文章
articleRouter.post('/save', verifyAuth, create)
// 获取所有文章
articleRouter.get('/', getAllArticle)
// 获取单篇文章
articleRouter.get('/:id/getArticle', getArticle)
// 更新文章
articleRouter.post('/update/:id', verifyAuth, update)
// 删除文章
articleRouter.post('/deleteArticle/:id', verifyAuth, deleteArticle)
// 获取文章图片
articleRouter.get('/image/:filename', fileInfo)
// 获取文章图片（增加时）
articleRouter.get('/imageadd/:filename', fileAddInfo)
// 获取文章主图
articleRouter.get('/theme/:filename', fileInfoMainPicture)
// 根据标签名获取文章_query
articleRouter.get('/label', getArticleByLabelName)

module.exports = articleRouter