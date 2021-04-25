const connection = require('../app/database')

class LabelService {
  // 获取所有标签
  async getLabel () {
    const statement = `SELECT * FROM label;`
    const result = await connection.execute(statement)
    return result[0]
  }

  // 根据标签名获取标签信息
  async getLabelByName (name) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }

  // 向article_label插入数据
  async setArticleLabel (articleId, labelId, name) {
    const statement = `INSERT INTO article_label (article_id, label_id, name) VALUES (?,?,?);`
    const result = await connection.execute(statement, [articleId, labelId, name])
    return result
  }

  // 根据标article_id和label_id获取标签信息
  async getLabelByAIDLID (articleId, labelId) {
    console.log(articleId, labelId)
    const statement = `SELECT * FROM article_label WHERE article_id = ? and label_id = ?;`
    const result = await connection.execute(statement, [articleId, labelId])
    return result[0].length != 0 ? true : false
  }
}

module.exports = new LabelService()
