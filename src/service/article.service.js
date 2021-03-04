const connection = require('../app/database')

class ArticelService {
  async create (title, content, userId) {
    // id content
    console.log(content, userId)
    const statement = `INSERT INTO article (title, content, user_id) VALUES(?, ?, ?);`
    const result = await connection.execute(statement, [title, content, userId])
    return result
  }

  async getAllArticle () {
    const statement = `SELECT * FROM article;`
    const result = await connection.execute(statement)
    return result
  }
  async getArticle (id) {
    const statement = `SELECT * FROM article WHERE id = ?;`
    const result = await connection.execute(statement, [id])
    return result
  }
}
module.exports = new ArticelService()