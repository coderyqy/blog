const Router = require("koa-router")

const messageRouter = new Router({ prefix: '/message' })
const { create, replyMessage, getArticleMessageList, getReplyUserName } = require('../controller/message.controller')

// 评论
messageRouter.post('/publish', create)
// 回复评论
messageRouter.post('/reply/', replyMessage)
// 获取留言
messageRouter.get('/getmsg', getArticleMessageList)
// 获取被评论的人的名字
messageRouter.get('/replyname/:messageId', getReplyUserName)

module.exports = messageRouter