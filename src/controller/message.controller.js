const messageService = require("../service/message.service")
const userService = require("../service/user.service")
const { dayFormat } = require("../middleware/day.middleware")

class MessageController {
  //获取所有留言
  async getAllArticleMessage (ctx, next) {
    const result = await messageService.getAllMessage()
    ctx.body = result
  }

  // 发布留言
  async create (ctx, next) {
    const { name, content } = ctx.request.body
    // 查找用户
    let userId = ''
    const userInfo = await userService.getFontEndUserByName(name)
    if (userInfo.length == 0) {
      // 创建用户
      const result = await userService.createFontEndUser(name)
      userId = result.insertId
    } else {
      userId = userInfo[0].id
    }
    // 创建留言
    const result = await messageService.create(content, userId)
    // 返回该文章的所有评论
    const messagelist = await messageService.getAllMessage()
    ctx.body = messagelist
    next()
  }

  // 回复留言
  async replyMessage (ctx, next) {
    const { name, content, messageId } = ctx.request.body
    // 查找用户
    let userId = ''
    const userInfo = await userService.getFontEndUserByName(name)
    if (userInfo.length == 0) {
      // 创建用户
      const result = await userService.createFontEndUser(name)
      userId = result.insertId
    } else {
      userId = userInfo[0].id
    }
    // 回复评论
    await messageService.reply(content, userId, messageId)
    // 返回该文章的所有评论
    const messagelist = await messageService.getAllMessage()
    ctx.body = messagelist
    next()
  }

  // 获取的所有留言
  async getArticleMessageList (ctx, next) {
    try {
      const result = await messageService.getAllMessage()
      for (let item of result) {
        item.createAt = dayFormat(item.createAt)
      }
      ctx.body = result
      next()
    } catch (error) {
      console.log(error)
    }
  }

  // 获取被评论的人的名字
  async getReplyUserName (ctx, next) {
    try {
      const { messageId } = ctx.params
      const result = await messageService.getReplyUserNameByMessageId(messageId)
      const name = result[0].messageuser.name
      ctx.body = {
        name
      }
      next()
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new MessageController()