const Router = require("koa-router")
const { create, getAllArticle, getArticle, update } = require("../controller/article.controller")
const { verifyAuth } = require("../middleware/auth.middleware")


const articleRouter = new Router({ prefix: "/article" })

articleRouter.post('/save', verifyAuth, create)
articleRouter.get('/', verifyAuth, getAllArticle)
articleRouter.get('/:id/getArticle', verifyAuth, getArticle)
articleRouter.post('/update/:id', verifyAuth, update)

module.exports = articleRouter