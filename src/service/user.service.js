const connection = require('../app/database')

class UserService {
  async create (user) {
    console.log("service")
    // 后端
    const { name, password } = user
    const statement = `INSERT INTO users (name, password) VALUES (?,?);`
    const result = await connection.execute(statement, [name, password])
    return result
  }

  async getUserByName (name) {
    // 根据 用户名 查询数据库
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }

  /*
    前端用户
  */
  async getFontEndUserByName (name) {
    // 根据 用户名 查询数据库
    const statement = `SELECT * FROM font_end_user WHERE uname = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }

  async createFontEndUser (name) {
    try {
      const statement = `INSERT INTO font_end_user (uname) VALUES (?);`
      const result = await connection.execute(statement, [name])
      return result[0]
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new UserService()
