const connection = require('../app/database')

class ArticelService {
  async create (content, userId) {
    // id content
    const statement = `INSERT INFO article (content, user_id) VALUES(?, ?);`
    const result = await connection.execute(statement, [content, userId])
    return result
  }
}
module.exports = new ArticelService()