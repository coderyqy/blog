const connection = require('../app/database')

class ArticelService {
  // 创建文章
  async create (title, content, image, mimetype, userId) {
    const statement = `INSERT INTO article (title, content, image, mimetype, user_id) VALUES(?, ?, ?, ?, ?);`
    const result = await connection.execute(statement, [title, content, image, mimetype, userId])
    return result
  }

  // 获取所有文章
  async getAllArticle () {
    const statement = `SELECT * FROM article;`
    const result = await connection.execute(statement)
    return result
  }

  // 获取单个文章
  async getArticle (id) {
    const statement = `SELECT * FROM article WHERE id = ?;`
    const result = await connection.execute(statement, [id])
    return result
  }

  // 
  async update (id, title, content, image, mimetype) {
    console.log(id, title, content, image, mimetype)
    const statement = `UPDATE article SET title = ?, content = ?, image = ?, mimetype = ? WHERE id = ?`
    const result = await connection.execute(statement, [title, content, image, mimetype, id])
    return result
  }
}
module.exports = new ArticelService()