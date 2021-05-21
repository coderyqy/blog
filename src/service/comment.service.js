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
      const statement = `INSERT INTO comment (content, article_id, user_id,comment_id) VALUES (?, ?, ?, ?)`
      const [result] = await connection.execute(statement, [content, articleId, userId, commentId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async getAllComment () {
    try {
      const statement = `
      SELECT c.id id,content,c.article_id articleId,c.user_id userId,c.comment_id commentId, c.is_status isStatus,c.createAt,
      JSON_OBJECT('id', feu.id, 'name', feu.uname, 'email', feu.email) commentuser
      FROM comment c
      LEFT JOIN font_end_user feu  ON c.user_id = feu.id
      order by c.id desc;`
      const result = await connection.execute(statement)
      return result[0]
    } catch (error) {
      console.log(error)
    }
  }

  // 获取文章的评论 
  async getArticleComment (id) {
    const statement = `
      SELECT c.id id,content,c.article_id articleId,c.user_id userId,c.comment_id commentId, c.createAt,
      JSON_OBJECT('id', feu.id, 'name', feu.uname, 'email', feu.email) commentuser
      FROM comment c
      LEFT JOIN font_end_user feu  ON c.user_id = feu.id
      WHERE c.article_id = ?
      order by c.id desc;`
    const result = await connection.execute(statement, [id])
    return result[0]
  }

  async getReplyUserNameByCommentId (commentId) {
    try {
      const statement = `
      SELECT c.id id,c.user_id userId,c.comment_id commentId,
      JSON_OBJECT('id', feu.id, 'name', feu.uname) commentuser
      FROM comment c
      LEFT JOIN font_end_user feu  ON c.user_id = feu.id
      WHERE c.id = ?
      order by c.id desc;`
      const result = await connection.execute(statement, [commentId])
      return result[0]
    } catch (error) {
      console.log(error)
    }
  }

  async deleteCommentByCommentId (commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`
    const result = await connection.execute(statement, [commentId])
    return result
  }
}

module.exports = new CommentService()