const connection = require('../app/database')

class MessageService {
  // 留言
  async create (content, userId) {
    try {
      const statement = `INSERT INTO message (content, user_id) VALUES (?, ?)`
      const [result] = await connection.execute(statement, [content, userId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  // 回复留言
  async reply (content, userId, messageId) {
    try {
      const statement = `INSERT INTO message (content, user_id,message_id) VALUES (?, ?, ?)`
      const [result] = await connection.execute(statement, [content, userId, messageId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async getAllMessage () {
    try {
      const statement = `
      SELECT c.id id,content,c.user_id userId,c.message_id commentId,c.is_status isStatus, c.createAt,
      JSON_OBJECT('id', feu.id, 'name', feu.uname, 'email', feu.email) commentuser
      FROM message c
      LEFT JOIN font_end_user feu ON c.user_id = feu.id
      order by c.id desc;`
      const result = await connection.execute(statement)
      return result[0]
    } catch (error) {
      console.log(error)
    }
  }

  // 获取留言回复人
  async getReplyUserNameByMessageId (messageId) {
    try {
      const statement = `
      SELECT c.id id,c.user_id userId,c.message_id messageId,
      JSON_OBJECT('id', feu.id, 'name', feu.uname) messageuser
      FROM message c
      LEFT JOIN font_end_user feu  ON c.user_id = feu.id
      WHERE c.id = ?
      order by c.id desc;`
      const result = await connection.execute(statement, [messageId])
      return result[0]
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new MessageService()