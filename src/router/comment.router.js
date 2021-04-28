const Router = require("koa-router")

const commentRouter = new Router({ prefix: '/comment' })
const { create } = require('../controller/comment.controller')

// 评论
commentRouter.post('/:articleId', create)


module.exports = commentRouter