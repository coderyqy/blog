const Router = require("koa-router")

const commentRouter = new Router({ prefix: '/comment' })
const { getAllArticleComment, create, replyComment, getArticleCommentList, getReplyUserName, deleteComment } = require('../controller/comment.controller')

// 获取所有评论
commentRouter.get('/', getAllArticleComment)
// 评论
commentRouter.post('/:articleId', create)
// 回复评论
commentRouter.post('/reply/:articleId', replyComment)
// 获取文章评论
commentRouter.get('/:articleId', getArticleCommentList)
// 获取被评论的人的名字
commentRouter.get('/replyname/:commentId', getReplyUserName)
// 删除评论
commentRouter.post('/delete/:commentId', deleteComment)

module.exports = commentRouter