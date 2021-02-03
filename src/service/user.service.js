const connection = require('../app/database')

class UserService {
  async create (user) {
    console.log("service")
    // 将用户数据保存到数据库中
    const { name, password } = user
    const statement = `INSERT INTO users (name, password) VALUES (?,?);`
    const result = await connection.execute(statement, [name, password])
    return result
  }

  async getUserByName (name) {
    // 根据 用户名 查询数据库
    const statement = `SELECT * FROM users WHERE name = ?;`
    const result = await connection.execute(statement, [name])
    console.log("getUserByName", name)
    console.log(result[0])
    return result[0]
  }
}

module.exports = new UserService()
