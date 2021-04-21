const connection = require('../app/database')

class FileService {
  async createAvatar (filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  async getAvatarByUserId (userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [result] = await connection.execute(statement, [userId])
    return result[0]
  }

  // 向数据库添加图片信息
  async createFile (filename, mimetype, size, articleId) {
    console.log(filename, mimetype, size, articleId)
    try {
      const statement = `INSERT INTO file (filename, mimetype, size, article_id) VALUES (?, ?, ?, ?)`
      const [result] = await connection.execute(statement, [filename, mimetype, size, articleId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  // 获取文章图片
  async getFileByFilename (filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }

  // 获取主图信息
  async getMainPicByFilename (filename) {
    const statement = `SELECT * FROM article WHERE image = ?;`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }
}

module.exports = new FileService()