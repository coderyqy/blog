const connection = require('../app/database')

class UserService {
  async create (user) {
    console.log("service")
    // 后端
    const { name, password } = user
    const statement = `INSERT INTO admin (name, password) VALUES (?,?);`
    const result = await connection.execute(statement, [name, password])
    return result
  }

  async getUserByName (name) {
    // 根据 用户名 查询数据库
    const statement = `SELECT * FROM admin WHERE name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }

  /*
    前端用户
  */
  // 获取所有用户
  async getAllFontEndUser () {
    // 根据 用户名 查询数据库
    const statement = `SELECT * FROM font_end_user;`
    const result = await connection.execute(statement)
    return result[0]
  }

  // 删除用户
  async deleteFontEnd (fontEndId) {
    const statement = `DELETE FROM font_end_user WHERE id = ?`
    const result = await connection.execute(statement, [fontEndId])
    return result
  }

  // 根据用户名获取
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
