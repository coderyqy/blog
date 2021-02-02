const connection = require('../app/database')

class UserService {
  async create (user) {
    console.log("service")
    // 将用户数据保存到数据库中
    const { name, password } = user
    console.log(name, password)
    const statement = `INSERT INTO users (name, password) VALUES (?,?);`
    const result = await connection.execute(statement, [name, password])

    return result
  }

  async getUserByName (name) {
    console.log("准备查询")
    const statement = `SELECT * FROM users where name = ?;`
    const result = await connection.execute(statement, [name])

    return result[0]
  }
}

module.exports = new UserService()
