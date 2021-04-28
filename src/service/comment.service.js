const connection = require('../app/database')

class CommentService {
  // 评论
  async create (content, articleId, userId) {
    console.log(content, articleId, userId)
    try {
      const statement = `INSERT INTO comment (content, article_id, user_id) VALUES (?, ?, ?)`
      const [result] = await connection.execute(statement, [content, articleId, userId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  // 回复评论
  async reply (content, articleId, userId, commentId) {
    try {
      const statement = `INSERT INTO comment (content, article_id, user_id) VALUES (?, ?, ?, ?)`
      const [result] = await connection.execute(statement, [content, articleId, userId, commentId])
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new CommentService()