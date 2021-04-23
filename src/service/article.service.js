const connection = require('../app/database')

class ArticelService {
  // 创建文章
  async create (title, content, condec, image, mimetype, userId) {
    const statement = `INSERT INTO article (title, condec, content, image, mimetype, user_id) VALUES(?, ?, ?, ?, ?, ?);`
    const result = await connection.execute(statement, [title, condec, content, image, mimetype, userId])
    return result
  }

  // 获取所有文章
  async getAllArticle () {
    const statement = `SELECT * FROM article;`
    const result = await connection.execute(statement)
    return result
  }

  // 获取单个文章
  /*
    LEFT JOIN 左连接查询
    GROUP BY 分组
    查询语句中使用了 JSON_ARRAYAGG，如果不加 GROUP BY 会报错
  */
  async getArticle (id) {
    const statement = `
      SELECT aList.id,aList.title,aList.condec,aList.content,aList.image,aList.mimetype,aList.createAt,aList.updateAt,
      JSON_ARRAYAGG(
        JSON_OBJECT('id', l.id, 'name', l.name)
      ) labels
      FROM article aList
      LEFT JOIN article_label  al ON aList.id = al.article_id
      LEFT JOIN label l ON al.label_id = l.id
      WHERE aList.id = ?
      GROUP BY aList.id;`
    const result = await connection.execute(statement, [id])
    return result
  }

  // 修改文章
  async update (id, title, condec, content, image, mimetype) {
    const statement = `UPDATE article SET title = ?, condec=?, content = ?, image = ?, mimetype = ? WHERE id = ?`
    const result = await connection.execute(statement, [title, condec, content, image, mimetype, id])
    return result
  }

  // 删除文章
  async deleteArticle (articleId) {
    const statement = `DELETE FROM article WHERE id = ?`
    const result = await connection.execute(statement, [articleId])
    return result
  }
}
module.exports = new ArticelService()